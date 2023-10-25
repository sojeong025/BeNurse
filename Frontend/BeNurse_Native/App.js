import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { WebView } from "react-native-webview";
import { WithLocalSvg } from "react-native-svg";
import Bell from "./assets/Icons/Bell.svg";
import WorkTable from "./assets/Icons/WorkTable.svg";
import TakingOver from "./assets/Icons/TakingOver.svg";
import Main from "./assets/Icons/Main.svg";
import Patient from "./assets/Icons/Patient.svg";
import Equipment from "./assets/Icons/Equipment.svg";

export default function App() {
  return (
    <View style={styles.Container}>
      <View style={styles.NavBar}>
        <View style={styles.NavBarLeft}></View>
        <View style={styles.NavBarCenter}>
          <Text style={styles.NavBarTitle}>환자 관리</Text>
        </View>
        <View style={styles.NavBarRight}>
          <WithLocalSvg width={20} height={20} asset={Bell} />
        </View>
      </View>
      <WebView style={styles.WebView} source={{ uri: "https://google.com" }} />
      <View style={styles.TabBar}>
        <View style={styles.TabBarItem}>
          <WithLocalSvg width={22} height={22} asset={WorkTable} />
          <Text style={styles.TabBarItemLabel}>근무 관리</Text>
        </View>
        <View style={styles.TabBarItem}>
          <WithLocalSvg width={22} height={22} asset={TakingOver} />
          <Text style={styles.TabBarItemLabel}>근무 관리</Text>
        </View>
        <View style={styles.TabBarItem}>
          <WithLocalSvg width={22} height={22} asset={Main} />
          <Text style={styles.TabBarItemLabel}>근무 관리</Text>
        </View>
        <View style={styles.TabBarItem}>
          <WithLocalSvg width={22} height={22} asset={Patient} />
          <Text style={styles.TabBarItemLabel}>근무 관리</Text>
        </View>
        <View style={styles.TabBarItem}>
          <WithLocalSvg width={22} height={22} asset={Equipment} />
          <Text style={styles.TabBarItemLabel}>근무 관리</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  NavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 110,
    backgroundColor: "#fff",
    opacity: 80,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },

  NavBarLeft: {
    flex: 1,
    height: 100,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 10,
  },

  NavBarCenter: {
    flex: 1,
    alignItems: "center",
  },

  NavBarRight: {
    flex: 1,
    height: 100,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 10,
  },

  NavBarTitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },

  WebView: {
    flex: 10,
  },

  TabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  TabBarItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },

  TabBarItemIcon: {
    width: 60,
    height: 60,
  },

  TabBarItemLabel: {
    fontSize: 10,
    color: "#333",
    marginTop: 6,
    letterSpacing: -0.8,
  },
});
