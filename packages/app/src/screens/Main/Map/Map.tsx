import React, { Component } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

interface Props {}
interface State {}

class Map extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ height: 300 }}></MapView>
      </View>
    );
  }
}

export { Map };
