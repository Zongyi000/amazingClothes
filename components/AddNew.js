import React from "react";
import { useState, useEffect } from "react";
import { Pressable, SafeAreaView, View, Text, TextInput, Alert, Button } from "react-native";
import { writeToDB } from '../Firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase-setup';
import ImageManager from "./ImageManager";
// import  styles  from "./styles";

const AddNew = () => {
    const [text, onChangeText] = useState("");
    const [content, onChangeContent] = useState("");
    const [uri, setUri] = useState("");
    const [clothes, setClothes] = useState([]);
    const imageHandler = (uri) => {
        console.log("imageHandler called", uri);
        setUri(uri);
    };
    // const [number, onChangeNumber] = React.useState(null);
    // const [image, setImage] = useState(null);
    // const [status, requestPermission] = ImagePicker.use s();

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //     });
    
    //     console.log(result);
    
    //     if (!result.canceled) {
    //       setImage(result.assets[0].uri);
    //     }
    // };
    
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
        // await writeToDB({ description: newClothesObj.description, amount: newClothesObj.amount, important: newClothesObj.important });
        await writeToDB({ title: newClothesObj.title, uri: newClothesObj.uri, content: newClothesObj.content });
        console.log("current clothes: ", clothes);
        // setModalVisible(false);
        // onChangeText("");
        // onChangeContent("");
    };

    return (
        <SafeAreaView>
            <Text>
                Title
            </Text>
            <TextInput
                value = {text}
                onChangeText={(newText) => {onChangeText(newText)}}
                placeholder="THIS FIT IS IN THE NAME! GOTTA HAVE IT!"
            />

            <ImageManager imageHandler={imageHandler} />


            <Text>
                Content
            </Text>
            <TextInput
                value = {content}
                onChangeText={(newContent) => {onChangeContent(newContent)}}
                placeholder="Enter the information about this item!"
            />

            <View >
                <Pressable
                    onPress={() => {
                        //location wqaiting for the next week......
                        const newClothesObj = {title: text, uri: uri, content: content};
                        onAdd(newClothesObj);
                        // navigation.goBack();
                        // navigation.navigate('Home');
                        console.log("confirm add!");
                        Alert.alert("New Item added successfully!");
                    }}
                    disabled={text.length? false: true}
                >
                    <Text>Submit</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}


export default AddNew;
