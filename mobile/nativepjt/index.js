/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import App from 'react-native-ble-manager/example/App';
// import App from './components/NFC/nfc_read_continuously';
import location from './components/bluetooth/location';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => location);
