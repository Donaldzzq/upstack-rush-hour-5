import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import { HomeNavigator } from "./HomeNavigator";

const BottomTab = createBottomTabNavigator(
  {
    HomeNavigator
  },
  {
    tabBarOptions: {
      style: {
        shadowColor: "rgba(0,0,0)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        borderTopColor: "transparent"
      }
    }
  }
);

export default createStackNavigator(
  {
    BottomTab
  },
  { headerMode: "none" }
);
