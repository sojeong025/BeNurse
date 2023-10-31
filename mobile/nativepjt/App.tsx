import React, {useEffect, useState} from 'react';

import {
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  Modal,
  View,
  Button,
  StatusBar,
} from 'react-native';

import {WebView} from 'react-native-webview';

import Scan_Modal from './components/bluetoothscan';
// import Scan_Modal from './components/blerssi';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  // const handleAndroidPermissions = () => {
  //   if (Platform.OS === 'android' && Platform.Version >= 31) {
  //     PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  //       PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     ]).then(result => {
  //       if (result) {
  //         console.debug(
  //           '[handleAndroidPermissions] User accepts runtime permissions android 12+',
  //         );
  //       } else {
  //         console.error(
  //           '[handleAndroidPermissions] User refuses runtime permissions android 12+',
  //         );
  //       }
  //     });
  //   }
  // };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    StatusBar.setBackgroundColor('#FF573300');
    StatusBar.setTranslucent(true);
    //   handleAndroidPermissions();
  }, []);

  return (
    <>
      {/* <StatusBar /> */}
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.webview}
          source={{uri: 'http://192.168.30.150:3000'}}
          // source={{uri: 'http://k9e105.p.ssafy.io/'}}
          onMessage={e => {
            const data = e.nativeEvent.data;
            toggleModal();
            // Alert.alert(data);
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
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                width: 300,
                height: 200,
              }}>
              <Scan_Modal />
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Button title="Close Modal" onPress={toggleModal} />
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
