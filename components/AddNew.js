import React from "react";
import { useState, useEffect } from "react";
import { Pressable, ScrollView, View, Text, TextInput, Alert, Button } from "react-native";
import { writeToDB } from '../Firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore, storage } from '../Firebase/firebase-setup';
import ImageManager from "./ImageManager";
import LocationManager from "./LocationManager";
import { LogBox } from 'react-native';
import  styles  from "./styles";
import { ref, uploadBytes } from "firebase/storage";

LogBox.ignoreAllLogs();

const AddNew = () => {
    const [text, onChangeText] = useState("");
    const [content, onChangeContent] = useState("");
    const [imageUri, setImageUri] = useState("");
    const [photoUri, setPhotoUri] = useState("");
    const [location, setLocation] = useState('');
    const [api, onChangeApi] = useState("");
    // const [likes, onChangeLikes] = useState("");
    // const [dislikes, onChangeDislikes] = useState("");
    const [clothes, setClothes] = useState([]);

    const photoHandler = (photoUri) => {
        // console.log("photoHandler called", photoUri);
        setPhotoUri(photoUri);
    };

    const imageHandler = (imageUri) => {
        // console.log("imageHandler called", imageUri);
        setImageUri(imageUri);
    };
    const locationHandler = (currentLocation) => {
        // console.log("locationHandler called", currentLocation);
        setLocation(currentLocation);
    }
    
    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(firestore, "clothes"),
        (querySnapshot) => {
          if (querySnapshot.empty) {
            setClothes([]);
            return;
          }
          setClothes(
            querySnapshot.docs.map((snapDoc) => {
              let data = snapDoc.data();
              data = { ...data, key: snapDoc.id };
              return data;
            })
          );
        }
      );
      return () => {
        unsubscribe();
      };
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    const name = "add new"

    const onAdd = async function (newClothesObj) {
         const uri = newClothesObj.imageUri;
        try {
          if (uri) {
            const imageBlob = await getImage(uri);
            const imageName =  uri.substring(uri.lastIndexOf("/") + 1);
            const imageRef =  ref(storage, `images/${imageName}`);
            const uploadResult = await uploadBytes(imageRef, imageBlob);
            newClothesObj.imageUri = uploadResult.metadata.fullPath; //replaced the uri with reference to the storage location
          }
          await writeToDB({ title: newClothesObj.title, imageUri: newClothesObj.imageUri, photoUri: newClothesObj.photoUri, content: newClothesObj.content, location: newClothesObj.location, likes: newClothesObj.likes, dislikes: newClothesObj.dislikes, api: newClothesObj.api});
        } catch (err) {
          console.log("image upload ", err);
        }
        // await writeToDB({ description: newClothesObj.description, amount: newClothesObj.amount, important: newClothesObj.important });
//         await writeToDB({ title: newClothesObj.title, imageUri: newClothesObj.imageUri, photoUri: newClothesObj.photoUri, content: newClothesObj.content, location: newClothesObj.location, likes: newClothesObj.likes, dislikes: newClothesObj.dislikes, api: newClothesObj.api});
        // console.log("current clothes: ", clothes);
        // setModalVisible(false);
        // onChangeText("");
        // onChangeContent("");
    };

    return (
        <ScrollView style = {styles.addNew}>
            <View style = {styles.addNewTitle}>
                <Text>
                    Title
                </Text>
                <TextInput
                    value = {text}
                    onChangeText={(newText) => {onChangeText(newText)}}
                    placeholder="THIS FIT IS IN THE NAME! GOTTA HAVE IT!"
                />
            </View>


            <View style = {styles.addNewImage}>
                <ImageManager photoHandler={photoHandler} imageHandler={imageHandler} />
            </View>

            <View style = {styles.addNewContent}>
                <Text>
                    Content
                </Text>
                <TextInput
                    value = {content}
                    onChangeText={(newContent) => {onChangeContent(newContent)}}
                    placeholder="Enter the information about this item!"
                />
            </View>
            <View>
                <LocationManager locationHandler={locationHandler}/>
            </View>

            <View style = {styles.addNewTitle}>
                <Text>
                    Upload Shopping Link
                </Text>
                <TextInput
                    value = {api}
                    onChangeText={(newApi) => {onChangeApi(newApi)}}
                    placeholder="THIS IS THE EXTERNAL API OF THE CLOTHES!"
                />
            </View>

            <View style = {styles.addNewTitle}>
                <Pressable
                    onPress={() => {
                        //location wqaiting for the next week......
                        const newClothesObj = {title: text, photoUri: photoUri, imageUri: imageUri, content: content, location: location, likes: 0, dislikes: 0, api: api};
                        onAdd(newClothesObj);
                        // navigation.goBack();
                        // navigation.navigate('Home');
                        // console.log("confirm add!");
                        Alert.alert("New Item added successfully!");
                    }}
                    disabled={text.length? false: true}
                >
                    <Text style = {styles.blueButton}>Submit</Text>
                </Pressable>
            </View>

        </ScrollView>
    );
}


export default AddNew;
