import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import { MeNavigator } from "./MeNavigator";
import { ROUTES } from "./Routes";
import { MapNavigator } from "./MapNavigator";
import { Chat } from "../screens/Main/Chat";
import { MessageNavigator } from "./MessageNavigator";
import { UserProfile } from "../screens/Main/UserProfile";
import { Profile } from "../screens/Main/Profile";
import { InviteNavigator } from "./InviteNavigator";

const BottomTab = createBottomTabNavigator(
  {
    [ROUTES.main.map]: MapNavigator,
    [ROUTES.main.message]: MessageNavigator,
    [ROUTES.main.invite]: InviteNavigator,
    [ROUTES.main.me]: MeNavigator
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
    },
    initialRouteName: ROUTES.main.map
  }
);

export default createStackNavigator(
  {
    [ROUTES.main.tab]: BottomTab,
    [ROUTES.main.chat]: Chat,
    [ROUTES.main.userprofile]: UserProfile,
    [ROUTES.main.profile]: Profile
  },
  { headerMode: "none" }
);
