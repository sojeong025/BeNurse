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
} from 'react-native';

const SECONDS_TO_SCAN_FOR = 20;
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


const location = () => {
  const connected_becon = {}
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
  }

  // ble신호 스캔이 중지 되었을때 발생되는 이벤트 함수
  const whenscanstopped=() => {
    console.debug('[ScanStop] scan is stopped.');
    const blelist = BleManager.getDiscoveredPeripherals()
    console.debug()
  }

  //스캔 과정에서 특정 신호가 감지되었을때 발생되는 이벤트 함수
  const whensenblesignal = (peripheral: Peripheral) => {
    // 해당병원의 비콘에 해당하는 신호가 아니면 리턴
    if(!beacon_address.includes(peripheral.id)) return;

    BleManager.connect(peripheral.id).then(()=>{
      console.debug(peripheral.id, " : connected")
    })





  }

  useEffect(() => {


    return () => {

  }, []);

  return (

  );
};

export default location;
