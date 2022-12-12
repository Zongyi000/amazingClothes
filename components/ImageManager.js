import { View, Image, Text, Button } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/styles";

export default function ImageManager({ photoHandler, imageHandler }) {
  const [permissionInfo, requestPermisson] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  const verifyPermission = async () => {
    if (permissionInfo.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermisson();
    return requestPermissionResponse.granted;
  };


  const takePhotoHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      let takePhotoResult = await ImagePicker.launchCameraAsync({ allowsEditing: true }); //this is to take a photo

      if (!takePhotoResult.canceled) { setPhotoUri(takePhotoResult.assets[0].uri) }
      setPhotoUri(takePhotoResult.uri);
      photoHandler(takePhotoResult.uri);
    } catch (err) {
      console.log("Image taking error ", err);
    }
  };

  const uploadImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      let uploadResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!uploadResult.canceled) { setImageUri(uploadResult.assets[0].uri) }
      setImageUri(uploadResult.uri);
      imageHandler(uploadResult.uri);
    } catch (err) {
      console.log("Image taking error ", err);
    }
  };

  return (
    <View>
      <Button title="Take a photo" onPress={takePhotoHandler} />
      {photoUri ? (
        <View>
          <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />
          <Button title="Delete" onPress={() => { setPhotoUri("") }} />
        </View>
      ) : (
        <Text style={styles.addNewPlaceholder}> No image yet! Please take a photo using your camera...</Text>
      )}


      <Button title="Upload an image" onPress={uploadImageHandler} />
      {imageUri ? (
        <View>
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          <Button title="Delete" onPress={() => { setImageUri("") }} />
        </View>
      ) : (
        <Text style={styles.addNewPlaceholder}> No image yet! Please upload a photo from your library...</Text>
      )}

    </View>
  );
}