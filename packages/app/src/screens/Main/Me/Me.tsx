import React, { Component } from "react";
import { View, Text } from "react-native";

interface Props {}
interface State {}

class Me extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View>
        <Text>Me</Text>
      </View>
    );
  }
}

export { Me };
