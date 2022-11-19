import React from "react";
import { useState, useEffect } from "react";
import { Pressable, SafeAreaView, View, Text, TextInput, Alert, Button } from "react-native";
import { writeToDB } from '../Firebase/firestore'
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase-setup';
import ImageManager from "./ImageManager";
import { LogBox } from 'react-native';
import  styles  from "./styles";

LogBox.ignoreAllLogs();

const AddNew = () => {
    const [text, onChangeText] = useState("");
    const [content, onChangeContent] = useState("");
    const [uri, setUri] = useState("");
    const [clothes, setClothes] = useState([]);
    const imageHandler = (uri) => {
        console.log("imageHandler called", uri);
        setUri(uri);
    };

    
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
        // console.log("current clothes: ", clothes);
        // setModalVisible(false);
        // onChangeText("");
        // onChangeContent("");
    };

    return (
        <SafeAreaView style = {styles.addNew}>
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
                <ImageManager imageHandler={imageHandler} />
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

            <View style = {styles.addNewSubmit}>
                <Pressable
                    onPress={() => {
                        //location wqaiting for the next week......
                        const newClothesObj = {title: text, uri: uri, content: content};
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

        </SafeAreaView>
    );
}


export default AddNew;