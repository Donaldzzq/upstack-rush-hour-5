import React, { Component } from "react";
import { Badge } from "react-native-elements";
import { ChatStore } from "../../store/ChatStore";
import { inject, observer } from "mobx-react";
import { View } from "react-native";

interface Props {
  chatStore?: ChatStore;
}
interface State {}

class InviteUnreadComponent extends Component<Props, State> {
  render() {
    return this.props.chatStore.inviteUnread > 0 ? (
      <Badge
        containerStyle={{
          position: "absolute",
          top: 0,
          right: -10
        }}
        value={this.props.chatStore.inviteUnread}
        status="error"
      />
    ) : null;
  }
}

const InviteUnread = inject("chatStore")(observer(InviteUnreadComponent));

export { InviteUnread };
