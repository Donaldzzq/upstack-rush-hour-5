import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Icon, Divider } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { GiftedChat } from "react-native-gifted-chat";
import { api } from "../../../config/api";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../../../store/AuthStore";
import { ChatStore } from "../../../store/ChatStore";

interface Props {
  navigation: NavigationStackProp;
  authStore: AuthStore;
  chatStore: ChatStore;
}

interface State {
  messages: any[];
}

class ChatComponent extends React.Component<Props, State> {
  state = {
    messages: []
  };

  componentDidMount = async () => {
    const { navigation, authStore } = this.props;
    const uid = navigation.getParam("uid");
    const { data: messagesRaw } = await api.get(
      `message/between/${authStore.user.uid}/${uid}`
    );

    this.setState({
      messages: messagesRaw.map(message => ({
        _id: message.id,
        text: message.body,
        createdAt: message.createdAt,
        user: {
          _id: message.fromUser.uid,
          avatar: message.fromUser.avatar
        }
      }))
      // [
      //   {
      //     _id: 1,
      //     text: "Hello developer",
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: "React Native",
      //       avatar: "https://placeimg.com/140/140/any"
      //     }
      //   }
      // ]
    });
  };

  onSend = async (messages = []) => {
    const { navigation, authStore, chatStore } = this.props;
    const uid = navigation.getParam("uid");

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    await api.post("/message", {
      from_uid: authStore.user.uid,
      to_uid: uid,
      body: messages[0].text
    });

    console.log("Updating Messages");
    chatStore.updateMessages(authStore.user.uid);
  };

  render() {
    const { authStore } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.buttonGoBack}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="ios-arrow-back" type="ionicon" />
          </TouchableOpacity>
        </View>
        <Divider />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: authStore.user.uid,
            avatar: authStore.user.avatar
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonGoBack: {
    flexGrow: 0,
    paddingLeft: "5%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10
  }
});

const Chat = inject("authStore", "chatStore")(observer(ChatComponent));

export { Chat };
