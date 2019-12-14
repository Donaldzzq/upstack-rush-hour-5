import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Alert,
  Picker
} from "react-native";
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

interface Props {
  navigation: NavigationStackProp;
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
}

const list = [
  {
    title: "Location",
    iconName: "profile",
    iconType: "antdesign"
  },
  {
    title: "Messages",
    iconName: "message",
    iconType: "material"
  },
  {
    title: "Where To Next?",
    iconName: "message",
    iconType: "material"
  },
  {
    title: "Invite",
    iconName: "adduser",
    iconType: "antdesign"
  }
];

class Profile extends Component<Props, State> {
  state = {
    userName: "Jennifer Lawerance",
    placesVisitedAmount: 0,
    friendsMadeAmount: 0,
    location: "Room 1, Shenzhen, China",
    spareRooms: 0,
    bioHobbies: "",
    wishLists: "",
    modalVisible: false
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        //onPress={this.setModalVisible(true)}
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

  locationChange = text => {
    this.setState({ location: text });
  };

  spareRoomsChange = text => {
    if (/^\d+$/.test(text)) {
      this.setState({
        spareRooms: parseInt(text,10)
      });
    }else{
      this.setState({ spareRooms: 0});
    }
  };

  bioHobbiesChange = text => {
    this.setState({ bioHobbies: text });
  };

  wishListsChange = text => {
    this.setState({ wishLists: text });
  };

  saveData = () => {};

  render() {
    const {
      userName,
      placesVisitedAmount,
      friendsMadeAmount,
      location,
      spareRooms,
      bioHobbies,
      wishLists
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
          <Card
            containerStyle={{
              padding: 0,
              width:"95%",
              marginTop:20,
              marginBottom:20,
            }}
          >
            <Input
              placeholder="Input your location"
              leftIcon={{ type: "entypo", name: "location" }}
              label="Location"
              leftIconContainerStyle={{ marginRight: 10 }}
              containerStyle={{ marginBottom: 20 }}
              value={location}
              onChangeText={text => this.locationChange(text)}
            />
            <Input
              placeholder="Input your spare rooms amount"
              leftIcon={{ type: "ionicon", name: "md-bed" }}
              label="Spare Rooms"
              leftIconContainerStyle={{ marginRight: 10 }}
              containerStyle={{ marginBottom: 20 }}
              value={spareRooms.toString()}
              keyboardType={'numeric'}
              onChangeText={text => this.spareRoomsChange(text)}
            />
            <Input
              placeholder="Input your biological hobbies"
              leftIcon={{ type: "material", name: "person" }}
              label="Bio"
              leftIconContainerStyle={{ marginRight: 10 }}
              containerStyle={{ marginBottom: 20 }}
              value={bioHobbies}
              onChangeText={text => this.bioHobbiesChange(text)}
            />
            <Input
              placeholder="Input your wishlists for customers"
              leftIcon={{ type: "material", name: "lightbulb-outline" }}
              label="Wishlists"
              leftIconContainerStyle={{ marginRight: 10 }}
              containerStyle={{ marginBottom: 20 }}
              value={wishLists}
              onChangeText={text => this.wishListsChange(text)}
            />
          </Card>
          <TouchableOpacity>
            <Button
              title="Save"
              icon={<Icon name="save" type="antdesign" color="white" />}
            />
          </TouchableOpacity>
        </View>
        {/* <FlatList
          ListHeaderComponent={this.renderListHeader}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
          data={list}
          style={{ flex: 1 }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight onPress={this.closeModal}>
                <Icon name="close" type="AntDesign" />
              </TouchableHighlight>
            </View>
          </View>
        </Modal> */}
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
export { Profile };
