import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, View } from "react-native";

import { TabBarIcon } from "../components/TabBarIcon";
import { Map } from "../screens/Main/Map";

const MapNavigator = createStackNavigator({
  Map
});

MapNavigator.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  ),
  tabBarTestID: "Map Tab"
};

export { MapNavigator };
