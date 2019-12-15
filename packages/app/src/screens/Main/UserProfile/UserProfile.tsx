import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import {
  Button,
  Input,
  Card,
  Text,
  Icon,
  Divider
} from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { api } from "../../../config/api";
import { ROUTES } from "../../../routes/Routes";
import { FlagType } from "react-native-country-picker-modal";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../../../store/AuthStore";

interface Props {
  navigation: NavigationStackProp;
  authStore: AuthStore;
}
interface State {
  userName: String;
  placesVisitedAmount: Number;
  friendsMadeAmount: Number;
  location: String;
  spareRooms: Number;
  bioHobbies: String;
  wishLists: String;
  modalVisible: Boolean;
  userAvatar: String;
  uid: String;
  isSelf: boolean;
}

class UserProfileComponent extends Component<Props, State> {
  state = {
    userName: "",
    placesVisitedAmount: 0,
    friendsMadeAmount: 0,
    location: "",
    spareRooms: 0,
    bioHobbies: "",
    wishLists: "",
    modalVisible: false,
    userAvatar: "",
    uid: "",
    isSelf: false
  };

  componentDidMount = async () => {
    const { navigation, authStore } = this.props;
    const id = navigation.getParam("id");
    const { data: user } = await api.get(`user/${id}`);

    this.setState({
      userName: `${user.first_name} ${user.last_name}`,
      location: `${user.Location.country} ${user.Location.city}`,
      spareRooms: user.Location.spare_rooms,
      userAvatar: user.avatar,
      uid: user.uid,
      isSelf: authStore.user.id === id
    });
  };

  locationChange = text => {
    this.setState({ location: text });
  };

  spareRoomsChange = text => {
    if (/^\d+$/.test(text)) {
      this.setState({
        spareRooms: parseInt(text, 10)
      });
    } else {
      this.setState({ spareRooms: 0 });
    }
  };

  bioHobbiesChange = text => {
    this.setState({ bioHobbies: text });
  };

  wishListsChange = text => {
    this.setState({ wishLists: text });
  };

  saveProfile = () => {};

  saveData = () => {};

  render() {
    const {
      userName,
      placesVisitedAmount,
      friendsMadeAmount,
      location,
      spareRooms,
      bioHobbies,
      wishLists,
      userAvatar,
      uid,
      isSelf
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.buttonGoBack}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="ios-arrow-back" type="ionicon" />
          </TouchableOpacity>
        </View>
        <Divider />
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
          <Divider />
          <Card
            containerStyle={{
              padding: 0,
              width: "95%",
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Input
              disabled
              placeholder="Input your location"
              leftIcon={{ type: "entypo", name: "location" }}
              label="Location"
              leftIconContainerStyle={{ marginRight: 10 }}
              containerStyle={{ marginBottom: 20 }}
              value={location}
              onChangeText={text => this.locationChange(text)}
            />
            <Input
              disabled={!isSelf}
              placeholder="Input your spare rooms amount"
              leftIcon={{ type: "ionicon", name: "md-bed" }}
              label="Spare Rooms"
              leftIconContainerStyle={{ marginRight: 10 }}
              containerStyle={{ marginBottom: 20 }}
              value={spareRooms.toString()}
              keyboardType={"numeric"}
              onChangeText={text => this.spareRoomsChange(text)}
            />
            <Input
              disabled={!isSelf}
              placeholder="Input your biological hobbies"
              leftIcon={{ type: "material", name: "person" }}
              label="Bio"
              leftIconContainerStyle={{ marginRight: 10 }}
              containerStyle={{ marginBottom: 20 }}
              value={bioHobbies}
              onChangeText={text => this.bioHobbiesChange(text)}
            />
            <Input
              disabled={!isSelf}
              placeholder="Input your wishlists for customers"
              leftIcon={{ type: "material", name: "lightbulb-outline" }}
              label="Wishlists"
              leftIconContainerStyle={{ marginRight: 10 }}
              containerStyle={{ marginBottom: 20 }}
              value={wishLists}
              onChangeText={text => this.wishListsChange(text)}
            />
          </Card>
          {!isSelf ? (
            <>
              <View style={styles.buttonRow}>
                <Button
                  containerStyle={styles.button}
                  title="Invite"
                  icon={<Icon name="save" type="antdesign" color="white" />}
                />
              </View>

              <View style={styles.buttonRow}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate(ROUTES.main.chat, {
                      uid
                    });
                  }}
                  containerStyle={styles.button}
                  title="Message"
                  icon={<Icon name="save" type="antdesign" color="white" />}
                />
              </View>
            </>
          ) : (
            <View style={styles.buttonRow}>
              <Button
                onPress={this.saveProfile}
                containerStyle={styles.button}
                title="Save"
                icon={<Icon name="save" type="antdesign" color="white" />}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginVertical: 20,
    fontSize: 30,
    color: "black"
  },
  information: {
    marginBottom: 50,
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
  buttonGoBack: {
    flexGrow: 0,
    paddingLeft: "5%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20
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
  }
});

const UserProfile = inject("authStore")(observer(UserProfileComponent));

export { UserProfile };
