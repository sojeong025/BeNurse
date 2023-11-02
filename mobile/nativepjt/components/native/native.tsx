import {useState, useEffect, useRef} from 'react';

import {
  startScan,
  whenscanstopped,
  getAndroidPermission,
} from '../bluetooth/blefun';

import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {Text, Button} from 'react-native';

class data_templat {
  patient: string;
  device: string;
  location: string;
  nurse: string;

  constructor(nurse: string) {
    this.nurse = nurse;
  }

  set_patient(patient: string) {
    this.patient = patient;
    return this;
  }
  set_device(device: string) {
    this.device = device;
    return this;
  }
}

//////////////////////////////////////////////////////////////////
//api 가 없어서 만든 임시 데이터
const temp_data = (tagid: string) => {
  if (tagid === '533736E2500001') {
    return {
      type: 'patient',
      data: {
        name: '개구리',
      },
    };
  } else if (tagid === '531E31E2500001') {
    return {
      type: 'patient',
      data: {
        name: '공룡',
      },
    };
  } else if (tagid === '537331E2500001') {
    return {
      type: 'device',
      data: {
        name: '팜레스트',
      },
    };
  } else {
    return {
      type: 'unknown',
      data: {
        name: 'unknown',
      },
    };
  }
};
const our_beacon = (hospital: string): string[] => {
  return [
    'E3:2F:4B:F3:F2:77',
    'DF:8F:78:F0:06:1F',
    'CA:8D:AC:9C:63:64',
    'CA:87:66:3E:6E:38',
  ];
};
//////////////////////////////////////////////////////////////////

// Pre-step, call this before any NFC operations
NfcManager.start();

function App(nurse: string, hospital: string) {
  const [read_data, setread_data] = useState(new data_templat(nurse));
  const [infostatus, setinfostatus] = useState(0);
  const beacon_address = our_beacon(hospital);
  const init = useRef(true);

  async function renfcscan() {
    setread_data(new data_templat(nurse));
    setinfostatus(0);

    try {
      await NfcManager.registerTagEvent();
      console.log('스캔 시작');
    } catch (ex) {
      console.log('ex', ex);
    }
  }

  useEffect(() => {
    // 최초 랜더링 시에만 실행
    console.log('useEffect');
    if (init.current) {
      console.log('1회 시행');
      NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
        //데이터 받아오기
        let nfcdata = temp_data(tag.id);
        //조건 분기 환자인 경우
        if (nfcdata.type === 'patient') {
          console.log(nfcdata.data.name);
          //데이터 저장
          setread_data(data => data.set_patient(nfcdata.data.name));
          //비트연산으로 데이터 저장 상태 갱신
          setinfostatus(num => num | 0b01);
        }
        // 조건 분기 장비인 경우
        else if (nfcdata.type === 'device') {
          console.log(nfcdata.data.name);
          //데이터 저장
          setread_data(data => data.set_device(nfcdata.data.name));
          //비트연산으로 데이터 저장 상태 갱신
          setinfostatus(num => num | 0b10);
        }
      });
      init.current = false;
    }

    try {
      NfcManager.registerTagEvent();
      console.log('스캔 시작');
    } catch (ex) {
      console.log('ex', ex);
    }

    if (infostatus === 0b11) {
      NfcManager.unregisterTagEvent();
    }

    getAndroidPermission();
    return;
  }, [read_data, infostatus]);
  return (
    <>
      <Text>{'\n\n\n\n'}</Text>
      <Text> 환자 : {read_data.patient}</Text>
      <Text> 장비 : {read_data.device}</Text>
      <Text> 장소 : {read_data.location}</Text>
      <Button
        onPress={renfcscan}
        title="nfctagstart"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
}

export default App;
