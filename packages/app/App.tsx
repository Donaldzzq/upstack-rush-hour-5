import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView
} from "react-native";
import { Provider } from "mobx-react";
import { rootStore } from "./src/store/RootStore";
import AppNavigator from "./src/routes/AppNavigator";

export default function App() {
  return (
    <Provider {...rootStore}>
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
