import React, { Component } from "react";
import { View, Text } from "react-native";

interface Props {}
interface State {}

class Home extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

export { Home };
