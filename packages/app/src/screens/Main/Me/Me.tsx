import React, { Component } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import {
  Button,
  Input,
  ListItem,
  Card,
  Text,
  Icon
} from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}

interface State {
  userName: String;
  location: String;
  placesVisitedAmount: Number;
  friendsMadeAmount: Number;
}

const list = [
  {
    title: "Profile",
    iconName: "profile",
    iconType: "antdesign",
    navigatePage: "Profile"
  },
  {
    title: "Messages",
    iconName: "message",
    iconType: "material",
    navigatePage: "Message"
  },
  {
    title: "Where To Next?",
    iconName: "local-airport",
    iconType: "material",
    navigatePage: "Map"
  },
  {
    title: "Invite",
    iconName: "adduser",
    iconType: "antdesign",
    navigatePage: "Profile"
  }
];

class Me extends Component<Props, State> {
  state = {
    userName: "Jennifer Lawerance",
    location: "Room 1, Shenzhen, China",
    placesVisitedAmount: 0,
    friendsMadeAmount: 0
  };

  goTo = navigatePage => () => {
    this.props.navigation.navigate(navigatePage);
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={this.goTo(item.navigatePage)}
        leftAvatar={<Icon name={item.iconName} type={item.iconType}></Icon>}
        title={item.title}
        subtitle={item.subtitle}
        bottomDivider
        chevron
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
    const { userName, placesVisitedAmount, friendsMadeAmount } = this.state;
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
              <Image
                style={{ width: 100, height: 100, borderRadius: 10 }}
                //resizeMode="contain"
                source={{
                  uri:
                    "https://akns-images.eonline.com/eol_images/Entire_Site/2019822/rs_1024x759-190922200817-1024-jennifer-lawrence-amazon.jpg?fit=inside|900:auto&output-quality=90"
                }}
              />
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
        <FlatList
          ListHeaderComponent={this.renderListHeader}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
          data={list}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
export { Me };
