import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import {
  Icon,
  Divider
} from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { GiftedChat } from "react-native-gifted-chat";

interface Props {
  navigation: NavigationStackProp;}

interface State {
  messages: any[];
}

class Chat extends React.Component<Props, State> {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
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
          _id: 1
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
    marginBottom:10
  },
});

export { Chat };
