import { createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";

import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";
import { Loading } from "../screens/Loading";
import { ROOT_ROUTES, ROUTES } from "./Routes";

export default createAppContainer(
  createAnimatedSwitchNavigator(
    {
      [ROOT_ROUTES.loading]: Loading,
      [ROOT_ROUTES.main]: MainTabNavigator,
      [ROOT_ROUTES.auth]: AuthStack
    },
    { initialRouteName: ROOT_ROUTES.loading }
  )
);
