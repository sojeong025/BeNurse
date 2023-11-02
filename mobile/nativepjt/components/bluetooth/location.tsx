/**
 * Sample BLE React Native App
 */

import React, {useState, useEffect} from 'react';
import {
  Text,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  View,
  Alert,
  Button,
} from 'react-native';

const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = false;

import BleManager, {
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

const beacon_address: string[] = [
  'E3:2F:4B:F3:F2:77',
  'DF:8F:78:F0:06:1F',
  'CA:8D:AC:9C:63:64',
  'CA:87:66:3E:6E:38',
];

const temp_location: Object = {
  'E3:2F:4B:F3:F2:77': '30005',
  'DF:8F:78:F0:06:1F': '30006',
  'CA:8D:AC:9C:63:64': '30001',
  'CA:87:66:3E:6E:38': '30007',
};

const location = () => {
  const connected_becon = {};
  let where = undefined;
  //ble신호를 스캔을 시작하는 함수
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

  // ble신호 스캔이 중지 되었을때 발생되는 이벤트 함수
  const whenscanstopped = () => {
    let tempstring = '';
    console.debug('[ScanStop] scan is stopped.');
    BleManager.getDiscoveredPeripherals([]).then(peripheralsArray => {
      // Success code
      peripheralsArray.forEach(device => {
        if (beacon_address.includes(device.id)) {
          tempstring += `${temp_location[device.id]}'s rssi : ${
            device.rssi
          } \n`;
          console.debug(device.name);
          console.debug(device.rssi);
          console.debug('==========');
        }
      });
      Alert.alert('결과', tempstring);
    });
  };

  //스캔 과정에서 특정 신호가 감지되었을때 발생되는 이벤트 함수
  const whensenblesignal = (peripheral: Peripheral) => {
    // 해당병원의 비콘에 해당하는 신호가 아니면 리턴
    if (!beacon_address.includes(peripheral.id)) return;

    BleManager.connect(peripheral.id).then(() => {
      console.debug(peripheral.id, ' : connected');
    });
  };

  const getAndroidPermission = () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]).then(result => {
        if (result) {
          // startScan();
          console.debug(
            '[getAndroidPermission] User accepts runtime permissions android 12+',
          );
        } else {
          console.error(
            '[getAndroidPermission] User refuses runtime permissions android 12+',
          );
        }
      });
    }
  };

  useEffect(() => {
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

    const listeners = [
      bleManagerEmitter.addListener('BleManagerStopScan', whenscanstopped),
    ];
    getAndroidPermission();

    return () => {
      for (const listener of listeners) {
        listener.remove();
      }
    };
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        onPress={() => {
          startScan();
          Alert.alert('시작');
        }}
        title="blescanstart"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default location;
