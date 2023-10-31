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
  FlatList,
  View,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
const SECONDS_TO_SCAN_FOR = 60;
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

const Scan_Modal = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>(),
  );

  //탐색하고자 하는 블루투스 신호의 mac address
  const mac_add: string[] = [
    'E3:2F:4B:F3:F2:77',
    'DF:8F:78:F0:06:1F',
    'CA:8D:AC:9C:63:64',
    'CA:87:66:3E:6E:38',
  ];

  const addOrUpdatePeripheral = (id: string, updatedPeripheral: Peripheral) => {
    // new Map() enables changing the reference & refreshing UI.
    // TOFIX not efficient.
    console.log(updatedPeripheral.name);
    setPeripherals(map => new Map(map.set(id, updatedPeripheral)));
  };

  const startScan = () => {
    if (!isScanning) {
      // reset found peripherals before scan
      setPeripherals(new Map<Peripheral['id'], Peripheral>());

      try {
        console.debug('[startScan] starting scan...');
        setIsScanning(true);
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
  };

  const handleStopScan = () => {
    setIsScanning(false);
    console.debug('[handleStopScan] scan is stopped.');
  };

  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    // if (!peripheral.name) {
    //   peripheral.name = 'NO NAME';
    // }
    // addOrUpdatePeripheral(peripheral.id, peripheral);
    // console.log(peripheral.name);
    if (peripheral.id === 'CA:87:66:3E:6E:38') {
      addOrUpdatePeripheral(peripheral.id, peripheral);
      BleManager.connect(peripheral.id)
        .then(() => {
          // Success code
          console.log('Connected');

          BleManager.stopScan().then(() => {
            console.debug('[app]scan stopped by close modal');

            const intervalid = setInterval(readRssi, 1000, 'CA:87:66:3E:6E:38');
            setTimeout(() => {
              clearInterval(intervalid);
              console.log('rssi측정 종료');
              BleManager.disconnect('CA:87:66:3E:6E:38', true);
            }, 30000);
          });
        })
        .catch(error => {
          // Failure code
          console.log(error);
        });
    }
  };

  const readRssi = (address: string) => {
    BleManager.readRSSI(address)
      .then(rssi => {
        // Success code
        console.log('Current RSSI: ' + rssi);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
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
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
    ];

    handleAndroidPermissions();

    return () => {
      BleManager.stopScan().then(() => {
        console.debug('[app]scan stopped by close modal');
      });
      console.debug('[app] main component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAndroidPermissions = () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]).then(result => {
        if (result) {
          startScan();
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
  const renderItem = ({item}: {item: Peripheral}) => {
    return (
      <Text>
        {item.name}
        {'\n'}
        {item.rssi}
        {'\n'}
      </Text>
    );
  };

  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [90, 50, 80, 50, 40, 60],
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={420}
        yAxisInterval={1} // optional, defaults to 1
        fromZero={true}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Scan_Modal;
