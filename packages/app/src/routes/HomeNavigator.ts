import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, View } from "react-native";

import { TabBarIcon } from "../components/TabBarIcon";
import { Home } from "../screens/Main/Home";

const HomeNavigator = createStackNavigator({
  Home
});

HomeNavigator.navigationOptions = {
  tabBarLabel: "For You"
};

export { HomeNavigator };
