import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import { ListItem, Text, Icon, Divider } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { inject, observer } from "mobx-react";
import { AuthStore } from "../../../store/AuthStore";
import { api } from "../../../config/api";
import {
  CountryCode,
  getAllCountries,
  FlagType
} from "react-native-country-picker-modal";

interface Props {
  navigation: NavigationStackProp;
  authStore: AuthStore;
}
interface State {
  userName: String;
  location: String;
  spareRooms: Number;
  bioHobbies: String;
  wishLists: String;
  userAvatar: String;
  countryCode: CountryCode;
  country: string;
}

const list = [
  {
    title: "Bio",
    iconName: "person",
    iconType: "material"
  },
  {
    title: "Wishlists",
    iconName: "lightbulb-outline",
    iconType: "material"
  }
];

class ProfileComponent extends Component<Props, State> {
  state = {
    userName: "",
    placesVisitedAmount: 0,
    friendsMadeAmount: 0,
    location: "",
    spareRooms: 0,
    bioHobbies: "",
    wishLists: "",
    userAvatar: "",
    countryCode: null,
    country: ""
  };

  componentDidMount = async () => {
    const { navigation, authStore } = this.props;
    const id = navigation.getParam("id", authStore.user.id);
    const countries = await getAllCountries(FlagType.FLAT);
    const { data: user } = await api.get(`user/${id}`);
    this.setState({
      userName: `${user.first_name} ${user.last_name}`,
      location: user.Location
        ? `${user.Location.country} ${user.Location.city}`
        : "",
      spareRooms: user.Location ? user.Location.spare_rooms : 0,
      userAvatar: user.avatar,
      //uid: user.uid,
      countryCode: countries.find(
        _country => _country.name === user.Location.country
      ).cca2,
      country: user.Location.country
    });
  };

  renderItem = ({ item }) => {
    const { bioHobbies, wishLists } = this.state;
    let subtitle = "";
    if (item.title === "Bio") {
      subtitle = bioHobbies!==""?bioHobbies:"Nope";
    }
    if (item.title === "Wishlists") {
      subtitle = wishLists!==""?wishLists:"Nope";
    }
    return (
      <ListItem
        leftAvatar={<Icon name={item.iconName} type={item.iconType}></Icon>}
        title={item.title}
        subtitle={subtitle}
        bottomDivider
      />
    );
  };

  extractItemKey = item => {
    return item.title;
  };

  renderListHeader = () => {
    return null;
  };

  render() {
    const { userName, location, spareRooms, userAvatar } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.buttonRow}>
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
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    source={{
                      uri: userAvatar
                    }}
                  />
              </View>
              <View style={styles.showAmount}>
                <Text h4>{userName}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <Text style={styles.showAmountText}>
                    Location: {location}
                  </Text>
                </View>
                <Text style={styles.showAmountText}>
                  Spare Rooms: {spareRooms}
                </Text>
              </View>
            </View>
        </View>
        <Divider />
        <FlatList
          ListHeaderComponent={this.renderListHeader}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
          data={list}
          style={{ flexGrow: 0 }}
        />
      </SafeAreaView>
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
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  showAmount: {
    flex: 0.9,
    marginLeft: 10,
  },
  showAmountText: {
    flexShrink: 1,
    marginTop: 12,
    fontSize: 15,
    color: "grey",
    flexWrap: "wrap"
  },
  buttonRow: {
    flexGrow: 0,
    paddingLeft: "5%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10
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

const Profile = inject("authStore")(observer(ProfileComponent));

export { Profile };
