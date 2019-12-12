import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";
import { Loading } from "../screens/Loading";
import { ROOT_ROUTES } from "./Routes";

export default createAppContainer(
  createSwitchNavigator(
    {
      [ROOT_ROUTES.loading]: Loading,
      [ROOT_ROUTES.main]: MainTabNavigator,
      [ROOT_ROUTES.auth]: AuthStack
    },
    { initialRouteName: ROOT_ROUTES.auth }
  )
);
