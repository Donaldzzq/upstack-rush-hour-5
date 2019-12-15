import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import {
  ListItem,
  Text,
  Icon,
  Divider
} from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}
interface State {
  userName: String;
  location: String;
  spareRooms: Number;
  bioHobbies: String;
  wishLists: String;
  modalVisible: Boolean;
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

class Profile extends Component<Props, State> {
  state = {
    userName: "Jennifer Lawerance",
    placesVisitedAmount: 0,
    friendsMadeAmount: 0,
    location: "Room 1, Shenzhen, China",
    spareRooms: 2,
    bioHobbies: "Night Owl",
    wishLists: "Beautiful Girls",
    modalVisible: false
  };

  renderItem = ({ item }) => {
    const { bioHobbies, wishLists } = this.state;
    let subtitle = "";
    if (item.title === "Bio") {
      subtitle = bioHobbies;
    }
    if (item.title === "Wishlists") {
      subtitle = wishLists;
    }
    return (
      <ListItem
        leftAvatar={<Icon name={item.iconName} type={item.iconType}></Icon>}
        title={item.title}
        subtitle={subtitle}
        bottomDivider
        //chevron
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
    const { userName, location, spareRooms } = this.state;
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
                  uri:
                    "https://akns-images.eonline.com/eol_images/Entire_Site/2019822/rs_1024x759-190922200817-1024-jennifer-lawrence-amazon.jpg?fit=inside|900:auto&output-quality=90"
                }}
              />
            </View>
            <View style={styles.showAmount}>
              <Text h4>{userName}</Text>
              <Text style={styles.showAmountText}>Location: {location}</Text>
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
    flexGrow: 0,
    paddingLeft: "5%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom:10
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
export { Profile };
