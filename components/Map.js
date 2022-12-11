import React, { useState } from "react";
import { StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import  styles  from "../styles/styles";

export default function ({ route, navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapPressed = (event) => {
    setCurrentLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const confirmHandler = () => {
    navigation.navigate("MyProfile", { currentLocation: currentLocation });
  };
  return (
    <>
      <MapView
        onPress={mapPressed}
        style={styles.map}
        initialRegion={{
          latitude: route.params.initialLocation
            ? route.params.initialLocation.latitude
            : 37.78825,
          longitude: route.params.initialLocation
            ? route.params.initialLocation.longitude
            : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && <Marker coordinate={currentLocation} />}
      </MapView>
      <Button
        disabled={!currentLocation}
        title="Confirm Selected Location"
        onPress={confirmHandler}
      />
    </>
  );
}