import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { ListItem, Icon } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import CountryPicker, {
  Country,
  CountryCode
} from "react-native-country-picker-modal";
import { api } from "../../../config/api";
import { ROUTES } from "../../../routes/Routes";
//import { CountryCode, Country } from './src/types'

interface Props {
  navigation: NavigationStackProp;
}
interface State {
  modalVisible: Boolean;
  countryCode: CountryCode;
  country: Object;
  users: any[];
}

// const list = [
//   {
//     name: "Amy Farha",
//     avatar_url:
//       "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
//     subtitle: "Frontend Dev",
//     latitude: 22.6831,
//     longitude: 114.0579
//   },
//   {
//     name: "Chris Jackson",
//     avatar_url:
//       "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
//     subtitle: "Backend Dev",
//     latitude: 22.6431,
//     longitude: 114.0579
//   }
// ];

class Map extends Component<Props, State> {
  state = {
    modalVisible: false,
    countryCode: null,
    country: {},
    users: []
  };

  map = React.createRef<MapView>();

  componentDidMount = async () => {
    this.map.current.animateToRegion({
      latitude: 22.5431,
      longitude: 114.0579,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    });

    this.getLocation("United Kingdom");
  };

  getLocation = async (country, city?) => {
    const { data } = await api.get(`/location`, {
      params: {
        country,
        city
      }
    });

    this.setState({
      users: data.map(user => ({
        latitude: user.latitude,
        longitude: user.longitude,
        name: user.User.first_name + user.User.last_name,
        avatar_url: user.User.avatar,
        id: user.id
      }))
    });

    this.onMarkers(data);
  };

  onMarkers = markers => {
    const markersLatLng = markers.map(marker => ({
      latitude: marker.latitude,
      longitude: marker.longitude
    }));
    this.map.current.fitToCoordinates(markersLatLng, {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
      },
      animated: false
    });
  };

  extractItemKey = item => {
    return item.name;
  };

  gotoUser = user => () => {
    this.props.navigation.navigate(ROUTES.main.profile, {
      id: user.id
    });
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={this.gotoUser(item)}
        leftAvatar={{ source: { uri: item.avatar_url } }}
        title={item.name}
        subtitle={item.subtitle}
        bottomDivider
        chevron
      />
    );
  };

  renderListHeader = () => {
    return null; //<Text style={styles.title}>People in Shenzhen</Text>;
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onSelect = (country: Country) => {
    this.setState({
      countryCode: country.cca2,
      country: country
    });
    this.getLocation(country.name);
  };

  render() {
    const { modalVisible, users, countryCode } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.searchButton}>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <Icon name="map-search-outline" type="material-community" />
          </TouchableOpacity>
          <CountryPicker
            countryCodes={["US", "GB", "HK"]}
            countryCode={countryCode}
            withFlag
            withFilter
            withEmoji={false}
            visible={modalVisible}
            onSelect={this.onSelect}
            onClose={() => {
              this.setModalVisible(false);
            }}
          />
        </View>
        <MapView ref={this.map} style={{ flex: 2 }}>
          {users.map(item => (
            <Marker
              key={item.name}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
              onCalloutPress={this.gotoUser(item)}
            >
              <View style={styles.markerContainer}>
                <Image
                  style={styles.markerAvatar}
                  source={{ uri: item.avatar_url }}
                />
              </View>

              <Callout>
                <Text style={styles.markerText}>{item.name}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <FlatList
          ListHeaderComponent={this.renderListHeader}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
          data={users}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20
  },
  searchButton: {
    flexGrow: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  markerContainer: {
    borderRadius: 20,
    overflow: "hidden"
  },
  markerAvatar: {
    width: 40,
    height: 40
  },
  markerText: {
    width: 100,
    textAlign: "center"
  }
});

export { Map };
