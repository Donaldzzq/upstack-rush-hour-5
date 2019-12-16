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
interface State {
  errorMessage: String;
  form: {
    email: string;
    password: string;
  };
}

class RegisterComponent extends Component<Props, State> {
  state = {
    errorMessage: "",
    form: {
      email: "",
      password: ""
    }
  };

  handleChange = field => text => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [field]: text
      }
    }));
  };

  componentDidMount = () => {};

  register = async () => {

    const { form } = this.state;

    if (!form.email || form.email === "" || form.password === "" || !form.password) {
      this.setState({
        errorMessage: "Email and password are all required"
      });
      return;
    }


    const result = await this.props.authStore.register(this.state.form);

    if (result.success) {
      this.props.navigation.navigate("Main");
    } else {
      this.setState({
        errorMessage: result.error
      });
    }
  };

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
    const {
      errorMessage,
      form: { email, password }
    } = this.state;
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
            <Text style={styles.title}>Register</Text>
            {/* <Input
              containerStyle={styles.form}
              inputStyle={styles.input}
              label="Your username"
              placeholder="First Name"
              leftIcon={{ type: "font-awesome", name: "user" }}
            /> */}
            <Input
              value={email}
              onChangeText={this.handleChange("email")}
              containerStyle={styles.form}
              inputStyle={styles.input}
              label="Your email address"
              placeholder="Email"
              leftIcon={{ type: "font-awesome", name: "user" }}
            />
            <Input
              value={password}
              secureTextEntry
              onChangeText={this.handleChange("password")}
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
                onPress={this.register}
                containerStyle={styles.loginButton}
                title="Register"
              />
            </View>

            <View style={styles.buttonRow}>
              <Button
                onPress={this.googleLogin}
                containerStyle={styles.loginButton}
                title="Login With Google"
              />
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

const Register = inject("authStore")(observer(RegisterComponent))

export { Register };
