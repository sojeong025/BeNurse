import {useState, useEffect} from 'react';
import React from 'react';
import {View, Text, StyleSheet, FlatList, Button, Alert} from 'react-native';
import NfcManager, {
  NfcTech,
  NfcEvents,
  nfcManager,
} from 'react-native-nfc-manager';

//api가 없어서 임시로 제공하는 데이터셋
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

class data_templat {
  patient: string;
  device: string;

  constructor(patient: string, device: string) {
    this.patient = patient;
    this.device = device;
  }
}

// Pre-step, call this before any NFC operations
NfcManager.start();

function App() {
  const [read_data, setread_data] = useState(new data_templat('', ''));
  const [infostatus, setinfostatus] = useState(0);

  async function readNdef() {
    setread_data(new data_templat('', ''));
    setinfostatus(0);

    try {
      await NfcManager.registerTagEvent();
      console.log('스캔 시작');
    } catch (ex) {
      console.log('ex', ex);
    }
  }

  useEffect(() => {
    console.log('useEffect');
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      //데이터 받아오기
      let nfcdata = temp_data(tag.id);
      //조건 분기 환자인 경우
      if (nfcdata.type === 'patient') {
        console.log(nfcdata.data.name);
        //데이터 저장
        setread_data(data => new data_templat(nfcdata.data.name, data.device));
        //비트연산으로 데이터 저장 상태 갱신
        setinfostatus(num => num | 0b01);
      }
      // 조건 분기 장비인 경우
      else if (nfcdata.type === 'device') {
        console.log(nfcdata.data.name);
        //데이터 저장
        setread_data(data => new data_templat(data.patient, nfcdata.data.name));
        //비트연산으로 데이터 저장 상태 갱신
        setinfostatus(num => num | 0b10);
      }
    });
    try {
      NfcManager.registerTagEvent();
    } catch (ex) {
      console.log('ex', ex);
    }
    console.log(infostatus);
    if (infostatus === 0b11) {
      Alert.alert('장비, 환자 인식완료 nfc스캔 중지');
      NfcManager.unregisterTagEvent();
    }

    return () => {
      NfcManager.unregisterTagEvent();
    };
  }, [read_data, infostatus]);

  return (
    <View style={styles.wrapper}>
      <Text>{'\n\n\n\n'}</Text>
      <Button
        onPress={readNdef}
        title="nfctagstart"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Text style={{color: 'white'}}>
        환자 : {read_data.patient}
        {'\n'} 장비 : {read_data.device}
      </Text>
      {/* <FlatList
        data={Array.from(read_data.device)}
        // contentContainerStyle={{rowGap: 12}}
        renderItem={renderItem}
        // keyExtractor={item => item}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
