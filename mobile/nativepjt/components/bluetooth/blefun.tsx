import BleManager, {
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
} from 'react-native-ble-manager';

import {PermissionsAndroid, Platform} from 'react-native';

const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = false;

export const startScan = () => {
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

export const whenscanstopped = (beacon_address: string[]) => {
  console.debug('[ScanStop] scan is stopped.');
  BleManager.getDiscoveredPeripherals([])
    .then(peripheralsArray => {
      // Success code
      peripheralsArray.forEach(device => {
        if (beacon_address.includes(device.id)) {
          //저장된 비콘만 처리하는 로직
        }
      });
      //가장 가까운 비콘을 반환
      return;
    })
    .catch(err => {
      return err;
    });
};
export const getAndroidPermission = () => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]).then(result => {
      if (result) {
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
