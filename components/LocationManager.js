import { View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

export default function LocationManager({ locationHandler }) {
  const MAPS_API_KEY = "AIzaSyB8mxKFHLwY25SqFnLipSU6_JW5L5e3jaU";
  const route = useRoute();
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (route.params) {
      setLocation({
        latitude: route.params.currentLocation.latitude,
        longitude: route.params.currentLocation.longitude,
      });
    }
  }, [route]);
  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };
  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const currentPosition = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
      await locationHandler(currentPosition);
    } catch (err) {
      console.log("locate user ", err);
    }
  };

  return (
    <View>
      <Button title="Share Your Location" onPress={locateUserHandler} />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
          }}
          style={{ width: "100%", height: 200 }}
        />
      )}
    </View>
  );
}