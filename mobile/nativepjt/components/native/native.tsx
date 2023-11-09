///////////////////////////////////////////////////////////////////////////////
import {useState, useEffect, useRef} from 'react';

import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {
  View,
  Text,
  NativeModules,
  NativeEventEmitter,
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
} from 'react-native';

import BleManager, {
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';

import {data_templat, proptemplat, postdata} from './interface';
import axios, {AxiosResponse} from 'axios';
///////////////////////////////////////////////////////////////////////////////
//ble신호 스캔 시작 함수
const startScan = async () => {
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
const ALLOW_DUPLICATES = true;

function Native(prop: proptemplat) {
  const [read_data, setread_data] = useState<data_templat>(new data_templat());
  const [infostatus, setinfostatus] = useState<Number>(0);
  const postData = useRef<postdata>({beaconID: '', deviceID: '', patientID: 0});
  const beacon = useRef<string[]>([]);
  const init = useRef<boolean>(true);
  const isblescan = useRef<boolean>(false);

  const closeModal = () => {
    const emitter = new NativeEventEmitter();
    emitter.emit('closeModal');
  };

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

        if ('patientID' in nfcdata) {
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
              postData.current.patientID = nfcdata.patientID;
              //비트연산으로 데이터 저장 상태 갱신
              setinfostatus(num => num | 0b01);
            });
        }
        // 조건 분기 장비인 경우
        else if (nfcdata.device) {
          //데이터 저장
          setread_data(data => data.set_device(nfcdata.name));
          postData.current.deviceID = nfcdata.id;
          //비트연산으로 데이터 저장 상태 갱신
          setinfostatus(num => num | 0b10);
        }
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };

  //스캔이 종료되었을 때 스캔된 비콘중 필터링 이후 가장 가까운 비콘 출력
  const whenscanstopped = async () => {
    console.debug('[ScanStop] scan is stopped.');
    BleManager.getDiscoveredPeripherals([])
      .then(peripheralsArray => {
        const headers = {
          accept: '*/*',
          Authorization: prop.Auth,
        };
        const closestbeacon = peripheralsArray
          .filter(device => beacon.current.includes(device.id))
          .reduce((prev, current) => {
            return prev.rssi > current.rssi ? prev : current;
          });
        axios
          .get(
            'https://k9e105.p.ssafy.io:9000/api/benurse/beacon?ID=' +
              closestbeacon.id,
            {headers: headers},
          )
          .then(res => {
            setread_data(data =>
              data.set_location(res.data.responseData.location),
            );
          });

        postData.current.beaconID = closestbeacon.id;
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
        console.error('get_our_beacon:', error);
      });
  };

  const usedevice = () => {
    Alert.alert('알림', '장비를 사용하시겠어요?', [
      {
        text: '취소',
        onPress: () => {},
      },
      {
        text: '확인',
        onPress: () => {
          const url =
            'https://k9e105.p.ssafy.io:9000/api/benurse/device-history';
          const header = {
            accept: '*/*',
            Authorization: prop.Auth,
            'Content-Type': 'application/json',
          };

          axios
            .post(url, postData.current, {headers: header})
            .then(response => {
              console.log(response.data);
              closeModal();
            });
        },
      },
    ]);
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

    // //데이터 조건 충족시 nfc스캔 중지
    // if ((infostatus & 0b11) === 0b11) {
    //   console.debug('[NFCStop]nfc scan stop');
    //   NfcManager.unregisterTagEvent();
    // }

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
      NfcManager.unregisterTagEvent();
    };
  }, [read_data, infostatus]);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 20,
      }}>
      <Text style={{fontSize: 16, color: '#555'}}>장비 사용 내역 등록</Text>
      <View
        style={{
          width: '100%',
          gap: 20,
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              flex: 0.25,
              alignItems: 'center',
              backgroundColor: '#9669F9',
              padding: 7,
              borderRadius: 14,
            }}>
            <Text style={{fontSize: 14, color: '#fff'}}>현위치</Text>
          </View>
          <View
            style={{
              flex: 0.7,
            }}>
            <Text style={{fontSize: 14, color: '#555'}}>
              {read_data.location ? read_data.location : '위치 검색중...'}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              flex: 0.25,
              alignItems: 'center',
              backgroundColor: '#9669F9',
              padding: 7,
              borderRadius: 14,
            }}>
            <Text style={{fontSize: 14, color: '#fff'}}>사용장비</Text>
          </View>
          <View style={{flex: 0.75}}>
            <Text style={{fontSize: 14, color: '#555'}}>
              {read_data.device ? read_data.device : '장비를 태그 해주세요.'}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              flex: 0.25,
              alignItems: 'center',
              backgroundColor: '#9669F9',
              padding: 7,
              borderRadius: 14,
            }}>
            <Text style={{fontSize: 14, color: '#fff'}}>사용환자</Text>
          </View>
          <View style={{flex: 0.75}}>
            <Text style={{fontSize: 14, color: '#555'}}>
              {read_data.patient ? read_data.patient : '환자를 태그 해주세요'}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.45}}>
          <Pressable
            onPress={closeModal}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              height: 50,
              borderRadius: 16,
            }}
            accessibilityLabel="Learn more about this purple button">
            <Text style={{color: '#9669F9'}}>취소</Text>
          </Pressable>
        </View>
        <View style={{flex: 0.45}}>
          <Pressable
            disabled={infostatus === 0b111 ? false : true}
            onPress={usedevice}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: infostatus === 0b111 ? '#9669F9' : '#D0BFFF',
              height: 50,
              borderRadius: 16,
            }}
            accessibilityLabel="Learn more about this purple button">
            <Text style={{color: '#fff'}}>저장하기</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default Native;
