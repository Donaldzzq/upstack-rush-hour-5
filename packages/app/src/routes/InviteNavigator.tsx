import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import { TabBarIcon } from "../components/TabBarIcon";
import { Invite } from "../screens/Main/Invite";
import { InviteUnread } from "../components/InviteUnread";

const InviteNavigator = createStackNavigator({
  Invite
});

InviteNavigator.navigationOptions = {
  tabBarLabel: "Invite",
  tabBarIcon: ({ focused }) => (
    <>
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-flag" : "md-flag"}
      >
        <InviteUnread />
      </TabBarIcon>
    </>
  ),
  tabBarTestID: "Invite Tab"
};

export { InviteNavigator };
