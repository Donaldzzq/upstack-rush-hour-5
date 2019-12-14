import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, View } from "react-native";

import { TabBarIcon } from "../components/TabBarIcon";
import { Me } from "../screens/Main/Me";

const MeNavigator = createStackNavigator({
  Me
});

MeNavigator.navigationOptions = {
  tabBarLabel: "Me",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  ),
  tabBarTestID: "Me Tab"
};

export { MeNavigator };
