import React, {useEffect, useState, useRef} from 'react';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  Modal,
  View,
  NativeEventEmitter,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';

import {WebView} from 'react-native-webview';

// import Scan_Modal from './components/bluetooth/bluetoothscan';
import Native from './components/native/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App(): JSX.Element {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const Authtoken = useRef<string>('');
  const interval = useRef<boolean>(false);

  const handleAndroidPermissions = () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]).then(result => {
        if (result) {
          console.debug(
            '[handleAndroidPermissions] User accepts runtime permissions android 12+',
          );
        } else {
          console.error(
            '[handleAndroidPermissions] User refuses runtime permissions android 12+',
          );
        }
      });
    }
  };

  const emitter = new NativeEventEmitter();

  emitter.addListener('closeModal', () => {
    setModalVisible(false);
  });

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    handleAndroidPermissions();
  }, []);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'#FF573300'}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.webview}
          // source={{uri: 'http://192.168.30.150:3000'}}
          source={{uri: 'https://k9e105.p.ssafy.io/'}}
          onMessage={e => {
            if (interval.current) {
              Alert.alert('', '잠시만 기다려 주세요');
              return;
            }
            const data = e.nativeEvent.data;
            Authtoken.current = data;
            interval.current = true;
            setTimeout(() => {
              interval.current = false;
            }, 7000);

            openModal();
          }}
        />
        <Modal
          animationType="slide" // 모달 나타날 때의 애니메이션 타입 (slide, fade, none 중 선택)
          transparent={true} // 배경 투명 여부
          visible={modalVisible} // 모달의 표시 여부
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                flex: 0.356,
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 20,
                width: '80%',
              }}>
              <Native Auth={Authtoken.current} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
