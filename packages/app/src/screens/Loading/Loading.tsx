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
import { inject, observer } from "mobx-react";
import { AuthStore } from "../../store/AuthStore";

interface Props {
  authStore: AuthStore;
  navigation: NavigationStackProp;
}

class LoadingComponent extends React.Component<Props> {
  async componentDidMount() {
    const { authStore } = this.props;

    const authed = await authStore.authenticate();

    if (authed) {
      this.props.navigation.navigate(ROUTES.main.main);
    } else {
      this.props.navigation.navigate(ROUTES.auth.welcome);
    }
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

const Loading = inject("authStore")(observer(LoadingComponent));

export { Loading };
