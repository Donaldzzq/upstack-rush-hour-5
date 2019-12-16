import React, { Component } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import {
  Button,
  Input,
  ListItem,
  Card,
  Text,
  Icon,
  Divider
} from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../../../store/AuthStore";
import { api } from "../../../config/api";
import { ROUTES } from "../../../routes/Routes";

interface Props {
  navigation: NavigationStackProp;
  authStore: AuthStore;
}

interface State {
  userName: String;
  location: String;
  placesVisitedAmount: Number;
  friendsMadeAmount: Number;
  userAvatar: string;
}

const list = [
  {
    title: "Profile",
    iconName: "profile",
    iconType: "antdesign",
    navigatePage: "UserProfile"
  }
  // {
  //   title: "Messages",
  //   iconName: "message",
  //   iconType: "material",
  //   navigatePage: "Message"
  // },
  // {
  //   title: "Where To Next?",
  //   iconName: "local-airport",
  //   iconType: "material",
  //   navigatePage: "Map"
  // },
  // {
  //   title: "Invite",
  //   iconName: "adduser",
  //   iconType: "antdesign",
  //   navigatePage: "Profile"
  // }
];

class MeComponent extends Component<Props, State> {
  state = {
    userName: "",
    location: "",
    placesVisitedAmount: 0,
    friendsMadeAmount: 0,
    userAvatar: ""
  };

  componentDidMount = async () => {
    const { authStore } = this.props;
    const { data: user } = await api.get(`user/${authStore.user.id}`);
    this.setState({
      userName: `${user.first_name} ${user.last_name}`,
      location: user.Location
        ? `${user.Location.country} ${user.Location.city}`
        : "",
      userAvatar: user.avatar
    });
  };

  goTo = navigatePage => () => {
    this.props.navigation.navigate(navigatePage);
  };

  extractItemKey = item => {
    return item.title;
  };

  renderListHeader = () => {
    return null;
  };

  logout = () => {
    const { authStore } = this.props;
    authStore.logout();
    this.props.navigation.navigate(ROUTES.auth.welcome);
  };

  render() {
    const {
      userName,
      placesVisitedAmount,
      friendsMadeAmount,
      userAvatar
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            style={{ width: 200, height: 100 }}
            resizeMode="contain"
            source={{
              uri:
                "https://www.ascentconf.com/wp-content/uploads/2018/08/upstack-logo.png"
            }}
          />
          {/* <Text style={styles.title}>Dashboard</Text> */}
          <View style={styles.information}>
            <View>
              {userAvatar !== "" ? (
                <Image
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                  //resizeMode="contain"
                  source={{
                    uri: userAvatar
                  }}
                />
              ) : null}
            </View>
            <View style={styles.showAmount}>
              <Text h4>{userName}</Text>
              <Text style={styles.showAmountText}>
                Places visited: {placesVisitedAmount}
              </Text>
              <Text style={styles.showAmountText}>
                Friends Made: {friendsMadeAmount}
              </Text>
            </View>
          </View>
        </View>
        <Divider />

        <ListItem
          onPress={this.goTo(ROUTES.main.userprofile)}
          leftAvatar={<Icon name="profile" type="antdesign"></Icon>}
          title={"Profile"}
          bottomDivider
          chevron
        />

        <Button
          onPress={this.logout}
          containerStyle={styles.logoutButtonContainer}
          buttonStyle={styles.logoutButton}
          title="Logout"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginTop: 30,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginVertical: 20,
    fontSize: 30,
    color: "black"
  },
  information: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  showAmount: {
    marginLeft: 10
  },
  showAmountText: {
    marginTop: 12,
    fontSize: 15,
    color: "grey"
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  loginButton: {
    width: "100%",
    marginVertical: 20
  },
  button: {
    flex: 1
  },
  form: {
    marginVertical: 20
  },
  input: {
    marginLeft: 10
  },
  goBack: {
    position: "absolute",
    top: 20,
    left: 20
  },
  error: {
    color: "red"
  },
  logoutButtonContainer: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "red"
  },
  logoutButton: {
    backgroundColor: "red"
  }
});

const Me = inject("authStore")(observer(MeComponent));

export { Me };
