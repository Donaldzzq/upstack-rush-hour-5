import { createStackNavigator } from "react-navigation-stack";

import { ROUTES } from "./Routes";
import { Login } from "../screens/Auth/Login";
import { Register } from "../screens/Auth/Register";

const AuthStack = createStackNavigator(
  {
    [ROUTES.auth.register]: Register,
    [ROUTES.auth.login]: Login
  },
  {
    headerMode: "none",
    navigationOptions: { headerVisible: false },
    initialRouteName: ROUTES.auth.login
  }
);

export default AuthStack;
