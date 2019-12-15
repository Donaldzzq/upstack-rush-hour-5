import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { api } from "../../../config/api";
import { AuthStore } from "../../../store/AuthStore";
import { inject, observer } from "mobx-react";
import { ROUTES } from "../../../routes/Routes";
import { ChatStore } from "../../../store/ChatStore";

interface Props {
  authStore: AuthStore;
  chatStore: ChatStore;
  navigation: NavigationStackProp;
}
interface State {}

class MessageComponent extends Component<Props, State> {
  componentDidMount = async () => {
    const { authStore, chatStore } = this.props;
    chatStore.updateMessages(authStore.user.uid);
  };

  extractItemKey = item => {
    return item.name;
  };

  gotoUser = user => () => {
    this.props.navigation.navigate(ROUTES.main.chat, {
      uid: user.uid
    });
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={this.gotoUser(item)}
        leftAvatar={{ source: { uri: item.avatar_url } }}
        title={item.name}
        subtitle={item.subtitle}
        bottomDivider
        chevron
      />
    );
  };

  renderListHeader = () => {
    return null;
  };

  render() {
    const { chatStore } = this.props;
    const users = chatStore.users.map(user => ({
      name: user.first_name + user.last_name,
      avatar_url: user.avatar,
      id: user.user_id,
      uid: user.user_uid,
      subtitle: user.body
    }));

    return (
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="ios-arrow-back" type="ionicon" />
          </TouchableOpacity> */}
        <FlatList
          ListHeaderComponent={this.renderListHeader}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
          data={users}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20
  },
  markerContainer: {
    borderRadius: 20,
    overflow: "hidden"
  },
  markerAvatar: {
    width: 40,
    height: 40
  },
  markerText: {
    width: 100,
    textAlign: "center"
  }
});

const Message = inject("authStore", "chatStore")(observer(MessageComponent));

export { Message };
