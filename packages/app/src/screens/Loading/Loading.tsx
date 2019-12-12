import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { ROUTES, ROOT_ROUTES } from "../../routes/Routes";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}

class Loading extends React.Component<Props> {
  async componentDidMount() {
    this.props.navigation.navigate(ROOT_ROUTES.main);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hands}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  hands: {
    marginBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export { Loading };
