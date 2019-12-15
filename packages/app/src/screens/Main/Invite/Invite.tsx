import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { ListItem, Icon, Badge } from "react-native-elements";
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

class InviteComponent extends Component<Props, State> {
  componentDidMount = async () => {
    const { authStore, chatStore } = this.props;

    if (chatStore.inviteUsers.length === 0) {
      chatStore.updateInvites(authStore.user.uid);
    }

    this.props.navigation.addListener("didFocus", () => {
      chatStore.setInviteUnread(0);
    });
  };

  extractItemKey = item => {
    return item.name;
  };

  gotoUser = user => () => {
    const { chatStore } = this.props;
    chatStore.resetInviteForUser(user.uid);
    this.props.navigation.navigate(ROUTES.main.userprofile, {
      id: user.id
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
        rightElement={
          item.unread ? <Badge value={null} status="error"></Badge> : null
        }
        chevron
      />
    );
  };

  renderListHeader = () => {
    return null;
  };

  render() {
    const { chatStore } = this.props;
    const users = chatStore.inviteUsers.map(user => ({
      name: `${user.fromUser.first_name} ${user.fromUser.last_name}`,
      avatar_url: user.fromUser.avatar,
      id: user.fromUser.id,
      uid: user.fromUser.uid,
      subtitle: `Invited you to ${user.fromUser.Location.country}`,
      unread: user.unread
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

const Invite = inject("authStore", "chatStore")(observer(InviteComponent));

export { Invite };
