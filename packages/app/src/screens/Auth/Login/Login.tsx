import React, { Component } from "react";
import { View, Text, Image } from "react-native";

interface Props {}
interface State {}

class Login extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.text}>Upstack meet up app</Text>
        <Image
          source={{
            uri:
              "https://react-native-elements.github.io/react-native-elements/img/logo.png"
          }}
        />
      </View>
    );
  }
}

const styles = {
  text: {
    fontSize: 20,
    color: "black"
  }
};

export { Login };
