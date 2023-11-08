///////////////////////////////////////////////////////////////////////////////
import {useState, useEffect, useRef} from 'react';

import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {
  Text,
  Button,
  NativeModules,
  NativeEventEmitter,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import BleManager, {
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';

import {data_templat, proptemplat} from './interface';
import axios, {AxiosResponse} from 'axios';
///////////////////////////////////////////////////////////////////////////////
//ble신호 스캔 시작 함수
const startScan = () => {
  try {
    console.debug('[startScan] starting scan...');
    BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
      matchMode: BleScanMatchMode.Sticky,
      scanMode: BleScanMode.LowLatency,
      callbackType: BleScanCallbackType.AllMatches,
    })
      .then(() => {
        console.debug('[startScan] scan promise returned successfully.');
      })
      .catch(err => {
        console.error('[startScan] ble scan returned in error', err);
      });
  } catch (error) {
    console.error('[startScan] ble scan error thrown', error);
  }
};
//권환 요청후 권한 요청 결과에따라 처리하는 함수
const getAndroidPermission = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]).then(result => {
        if (result) {
          resolve();
          console.debug(
            '[getAndroidPermission] User accepts runtime permissions android 12+',
          );
        } else {
          reject();
          console.error(
            '[getAndroidPermission] User refuses runtime permissions android 12+',
          );
        }
      });
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = false;

function Native(prop: proptemplat) {
  const [read_data, setread_data] = useState<data_templat>(new data_templat());
  const [infostatus, setinfostatus] = useState<Number>(0);
  const beacon = useRef<string[]>([]);
  const init = useRef<boolean>(true);
  const isblescan = useRef<boolean>(false);

  //저장된 정보를 초기화
  async function rescan() {
    isblescan.current = false;
    setread_data(new data_templat());
    setinfostatus(0);

    Alert.alert('다시 스캔', '스캔을 다시 시작합니다.');
  }

  //인식된 태그의 정보 처리 함수
  const nfctagsave = tag => {
    interface devicedata {
      name: string;
      hospitalID: number;
      img: string;
      info: string;
      asTel: string;
      id: string;
      device: boolean;
    }
    interface patientdata {
      patientID: number;
      id: string;
      device: boolean;
    }
    interface responseData {
      responseData: devicedata | patientdata;
      status: number;
    }

    const url = 'https://k9e105.p.ssafy.io:9000/api/benurse/nfc';
    const header = {
      accept: '*/*',
    };
    const params = {
      ID: tag.id,
    };

    axios
      .get(url, {headers: header, params: params})
      .then((response: AxiosResponse<responseData>) => {
        const nfcdata: devicedata | patientdata = response.data.responseData;
        console.log(nfcdata);

        if ('patientID' in nfcdata) {
          console.log(nfcdata.patientID);
          //데이터 저장
          axios
            .get('https://k9e105.p.ssafy.io:9000/api/benurse/emr/patient', {
              headers: header,
              params: {id: nfcdata.patientID},
            })
            .then(response => {
              setread_data(data =>
                data.set_patient(
                  response.data.responseData.patient.patient.name,
                ),
              );
            });
          //비트연산으로 데이터 저장 상태 갱신
          setinfostatus(num => num | 0b01);
        }
        // 조건 분기 장비인 경우
        else if (nfcdata.device) {
          console.log(nfcdata.name);
          //데이터 저장
          setread_data(data => data.set_device(nfcdata.name));
          //비트연산으로 데이터 저장 상태 갱신
          setinfostatus(num => num | 0b10);
        }
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };

  //스캔이 종료되었을 때 스캔된 비콘중 필터링 이후 가장 가까운 비콘 출력
  const whenscanstopped = () => {
    console.debug('[ScanStop] scan is stopped.');
    BleManager.getDiscoveredPeripherals([])
      .then(peripheralsArray => {
        const closestbeacon = peripheralsArray
          .filter(device => beacon.current.includes(device.id))
          .reduce((prev, current) => {
            return prev.rssi > current.rssi ? prev : current;
          });
        setread_data(data => data.set_location(closestbeacon.id));
        setinfostatus(num => num | 0b100);
      })
      .catch(err => {
        return err;
      });
  };

  const get_our_beacon = (Auth: string) => {
    interface beacon {
      location: string;
      floor: number;
      hospitalID: number;
      id: string;
    }
    interface responseData {
      responseData: beacon[];
      status: number;
    }

    type BeaconIds = responseData['responseData'][number]['id'][];

    const url = 'https://k9e105.p.ssafy.io:9000/api/benurse/beacon/all';
    const headers = {
      accept: '*/*',
      Authorization: Auth,
    };

    axios
      .get(url, {headers: headers})
      .then((response: AxiosResponse<responseData>) => {
        const beaconIds: BeaconIds = response.data.responseData.map(
          beacon => beacon.id,
        );
        beacon.current = beaconIds;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // 최초 랜더링 시에만 실행
    if (init.current) {
      //현재 병원의 비콘 받아오기
      get_our_beacon(prop.Auth);

      //Nfc시작 및 스캔 이벤트 등록
      NfcManager.start();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, nfctagsave);
      //최초 실행을 위한 init처리
      init.current = false;
    }

    //nfc스캔 시작(렌더링시 시작하기 위함)
    try {
      NfcManager.registerTagEvent();
      console.debug('[NFCStart] nfc scan start');
    } catch (ex) {
      console.log('ex', ex);
    }

    //데이터 조건 충족시 nfc스캔 중지
    if ((infostatus & 0b11) === 0b11) {
      console.debug('[NFCStop]nfc scan stop');
      NfcManager.unregisterTagEvent();
    }

    //데이터 충족시 alert
    if (infostatus === 0b111) {
      Alert.alert('3가지 정보 스캔 완료');
    }

    //ble스캔 시작을 위한 전처리
    try {
      BleManager.start({showAlert: false})
        .then(() => console.debug('BleManager started.'))
        .catch(error =>
          console.error('BeManager could not be started.', error),
        );
    } catch (error) {
      console.error('unexpected error starting BleManager.', error);
      return;
    }

    //ble 스캔 종료시 실행할 함수 이벤트 등록
    const listeners = [
      bleManagerEmitter.addListener('BleManagerStopScan', whenscanstopped),
    ];

    //ble스캔을 안했다면 스캔
    if (!isblescan.current) {
      //ble 통신을 위한 권한 요청
      getAndroidPermission()
        .then(() => {
          isblescan.current = true;
          //ble스캔 시작
          startScan();
        })
        .catch(() => {
          console.debug('permission error');
        });
    }

    return () => {
      // ble 이벤트 제거
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, [read_data, infostatus]);

  return (
    <>
      <Text>{'\n\n\n\n'}</Text>
      <Text> 환자 : {read_data.patient}</Text>
      <Text> 장비 : {read_data.device}</Text>
      <Text> 장소 : {read_data.location}</Text>
      <Button
        onPress={rescan}
        title="스캔 다시하기"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
}

export default Native;
