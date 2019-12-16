import React, { Component } from "react";
import { Badge } from "react-native-elements";
import { ChatStore } from "../../store/ChatStore";
import { inject, observer } from "mobx-react";
import { View } from "react-native";

interface Props {
  chatStore?: ChatStore;
}
interface State {}

class MessageUnreadComponent extends Component<Props, State> {
  render() {
    return this.props.chatStore.chatUnread > 0 ? (
      <Badge
        containerStyle={{
          position: "absolute",
          top: 0,
          right: -10
        }}
        value={this.props.chatStore.chatUnread}
        status="error"
      />
    ) : null;
  }
}

const MessageUnread = inject("chatStore")(observer(MessageUnreadComponent));

export { MessageUnread };
