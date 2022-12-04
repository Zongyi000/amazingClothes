import { View, Image, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { getCurrentPositionAsync } from "expo-location";
// import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { saveUser, getUser } from "../Firebase/firestore";

export default function LocationManager({locationHandler}) {
  const MAPS_API_KEY = "AIzaSyB8mxKFHLwY25SqFnLipSU6_JW5L5e3jaU";
  const navigation = useNavigation();
  const route = useRoute();
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  // useEffect(() => {
  //   async function getUserLocation() {
  //     try {
  //       const storedLocation = await getUser();
  //       setLocation(storedLocation);
  //       // console.log(storedLocation);
  //     } catch (err) {
  //       console.log("get user ", err);
  //     }
  //   }
  //   getUserLocation();
  // }, []);
  useEffect(() => {
    if (route.params) {
      // console.log(route.params);
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
      console.log("current location:", currentPosition);
      setLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
      await locationHandler(currentPosition);
      // Alert.alert("Your current location has been updated!");
    } catch (err) {
      console.log("locate user ", err);
    }
  };

  // const locationPickerHandler = () => {
  //   navigation.navigate("Map", { initialLocation: location });
  // };
  // const saveUserLocation = async () => {
  //   await saveUser(location);
  // };
  return (
    <View>
      <Button title="Upload Your Location" onPress={locateUserHandler} />
      {/* <Button title="Let me pick on the map" onPress={locationPickerHandler} /> */}

      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
          }}
          style={{ width: "100%", height: 200 }}
        />
      )}
      {/* <Button title="Save Location" onPress={saveUserLocation} /> */}
    </View>
  );
}