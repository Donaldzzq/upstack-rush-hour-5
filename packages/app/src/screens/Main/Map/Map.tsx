import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { ListItem } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}
interface State {}

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
  state = {};

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
    return <Text style={styles.title}>People in Shenzhen</Text>;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "center",
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
