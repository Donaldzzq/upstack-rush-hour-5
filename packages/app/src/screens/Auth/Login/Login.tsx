import React, { Component } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { Button, Input } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthStore } from "../../../store/AuthStore";
import { inject, observer } from "mobx-react";

interface Props {
  navigation: NavigationStackProp;
  authStore: AuthStore;
}
interface State {}

class LoginComponent extends Component<Props, State> {
  state = {
    errorMessage: ""
  };

  componentDidMount = () => {};

  googleLogin = async () => {
    const response = await this.props.authStore.googleLogin();
    if (response.success) {
      this.props.navigation.navigate("Main");
    } else {
      this.setState({
        errorMessage: response.message
      });
    }
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              containerStyle={styles.goBack}
              icon={{ name: "ios-arrow-back", type: "ionicon" }}
              type="clear"
            />
            <Image
              style={{ width: 200, height: 100 }}
              resizeMode="contain"
              source={{
                uri:
                  "https://www.ascentconf.com/wp-content/uploads/2018/08/upstack-logo.png"
              }}
            />
            <Text style={styles.title}>Login</Text>
            <Input
              containerStyle={styles.form}
              inputStyle={styles.input}
              label="Your email address"
              placeholder="Email"
              leftIcon={{ type: "font-awesome", name: "user" }}
            />
            <Input
              secureTextEntry
              containerStyle={styles.form}
              inputStyle={styles.input}
              label="Password"
              placeholder="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
            />
            {errorMessage !== "" ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <View style={styles.buttonRow}>
              <Button
                onPress={() => {
                  this.props.navigation.navigate("Main");
                }}
                containerStyle={styles.loginButton}
                title="Login"
              />
            </View>
            <View style={styles.buttonRow}>
              <Button
                onPress={this.googleLogin}
                containerStyle={{ ...styles.button, marginRight: 20 }}
                title="Login With Google"
              />
              <Button containerStyle={styles.button} title="Forgot password" />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginVertical: 20,
    fontSize: 30,
    color: "black"
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  loginButton: {
    width: "100%",
    marginVertical: 20
  },
  button: {
    flex: 1
  },
  form: {
    marginVertical: 20
  },
  input: {
    marginLeft: 10
  },
  goBack: {
    position: "absolute",
    top: 20,
    left: 20
  },
  error: {
    color: "red"
  }
});

const Login = inject("authStore")(observer(LoginComponent));

export { Login };
