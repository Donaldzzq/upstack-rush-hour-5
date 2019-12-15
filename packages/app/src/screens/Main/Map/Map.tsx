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
//import { CountryCode, Country } from './src/types'

interface Props {
  navigation: NavigationStackProp;
}
interface State {
  modalVisible: Boolean;
  countryCode: CountryCode;
  country: Object;
}

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Frontend Dev",
    latitude: 22.6831,
    longitude: 114.0579
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Backend Dev",
    latitude: 22.6431,
    longitude: 114.0579
  }
];

class Map extends Component<Props, State> {
  state = {
    modalVisible: false,
    countryCode: null,
    country: {}
  };

  map = React.createRef<MapView>();

  componentDidMount = () => {
    this.map.current.animateToRegion({
      latitude: 22.5431,
      longitude: 114.0579,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    });
  };

  extractItemKey = item => {
    return item.name;
  };

  gotoUser = user => () => {
    this.props.navigation.navigate("Chat");
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
    return null //<Text style={styles.title}>People in Shenzhen</Text>;
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onSelect = (country: Country) => {
    this.setState({ countryCode: country.cca2, country: country });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.searchButton}>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <Icon name="map-search-outline" type="material-community" />
          </TouchableOpacity>
          <CountryPicker
            countryCode={this.state.countryCode}
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
          {list.map(item => (
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
          data={list}
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
    marginVertical:20
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
