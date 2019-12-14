import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import { TabBarIcon } from "../components/TabBarIcon";
import { Message } from "../screens/Main/Message";

const MessageNavigator = createStackNavigator({
  Message
});

MessageNavigator.navigationOptions = {
  tabBarLabel: "Message",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatboxes"}
    />
  ),
  tabBarTestID: "Message Tab"
};

export { MessageNavigator };
