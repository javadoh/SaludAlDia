import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MapView, Constants } from "expo";

const { width, height } = Dimensions.get("window");

class MapHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.005922,
        longitudeDelta: 0.005421
      }
    };
  }

  static navigationOptions = {
    title: "Farmacias Ahumada"
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    const location = this.props.route.params.location;
    const hasLocationPermissions = this.props.route.params.
      hasLocationPermissions
    );
    const locationResult = this.props.route.params.locationResult;

    return (
      <View style={styles.container}>
        {location === null ? (
          <Text>Encontrando tu ubicación actual...</Text>
        ) : hasLocationPermissions === false ? (
          <Text>
            Los permisos para obtener la localización no están habilitados
          </Text>
        ) : location === null ? (
          <Text>No existe la región del mapa</Text>
        ) : (
          <MapView
            style={{ alignSelf: "stretch", height: height }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005922,
              longitudeDelta: 0.005421
            }}
            onRegionChange={this._handleMapRegionChange}
          >
            <MapView.Marker
              coordinate={location.coords}
              title="Mi Ubicación"
              description=""
            />
          </MapView>
        )}

        <Text>Location: {locationResult}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});

export default MapHome;
