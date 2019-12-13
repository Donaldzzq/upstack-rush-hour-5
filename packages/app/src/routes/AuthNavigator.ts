import { createStackNavigator } from "react-navigation-stack";

import { ROUTES } from "./Routes";
import { Login } from "../screens/Auth/Login";
import { Register } from "../screens/Auth/Register";
import { Welcome } from "../screens/Auth/Welcome";

const AuthStack = createStackNavigator(
  {
    [ROUTES.auth.register]: Register,
    [ROUTES.auth.login]: Login,
    [ROUTES.auth.welcome]: Welcome
  },
  {
    headerMode: "none",
    navigationOptions: { headerVisible: true },
    initialRouteName: ROUTES.auth.welcome
  }
);

export default AuthStack;
