import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}
interface State {}

class Welcome extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 100 }}
          resizeMode="contain"
          source={{
            uri:
              "https://www.ascentconf.com/wp-content/uploads/2018/08/upstack-logo.png"
          }}
        />
        <Text style={styles.title}>Upstack meet up app</Text>
        <Image
          style={{ width: "100%", height: 300 }}
          resizeMode="contain"
          source={{
            uri:
              "https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          }}
        />
        <View style={styles.buttonRow}>
          <Button
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
            containerStyle={styles.button}
            title="Login"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
            containerStyle={styles.button}
            title="Register"
          />
        </View>
      </View>
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
  button: {
    flex: 1,
    marginHorizontal: 10
  }
});

export { Welcome };
