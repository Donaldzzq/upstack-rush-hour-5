import React from "react";
import * as Icon from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { View } from "react-native";

interface Props {
  name: string;
  focused: boolean;
}

class TabBarIcon extends React.Component<Props> {
  render() {
    return (
      <View style={{ position: "relative" }}>
        <Icon.Ionicons
          name={this.props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={
            this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
          }
        />
        {this.props.children}
      </View>
    );
  }
}

export { TabBarIcon };
