/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import App from './components/NFC/nfc_read_continuously'; // nfc인식
// import location from './components/bluetooth/location'; //블루투스 스캔
import App from './components/native/native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
