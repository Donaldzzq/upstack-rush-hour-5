import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, View } from "react-native";

import { TabBarIcon } from "../components/TabBarIcon";
import { Home } from "../screens/Main/Home";

const HomeNavigator = createStackNavigator({
  Home
});

HomeNavigator.navigationOptions = {
  tabBarLabel: "Me",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  ),
  tabBarTestID: "Home Tab"
};

export { HomeNavigator };
