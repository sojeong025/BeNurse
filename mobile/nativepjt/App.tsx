import React from 'react';
import {Text, Dimensions, StyleSheet, SafeAreaView, Alert} from 'react-native';

import {WebView} from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: 'http://192.168.30.150:3000'}}
        onMessage={e => {
          const data = e.nativeEvent.data;
          Alert.alert(data);
        }}
      />
      {/* <Text>test</Text> */}
    </SafeAreaView>
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
