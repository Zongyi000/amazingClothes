import { addreviewToDB } from "../Firebase/firestore";

import React from "react";
import { useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  Button,
} from "react-native";
import { writeToDB } from "../Firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase/firebase-setup";
import ImageManager from "./ImageManager";
import { LogBox } from "react-native";
import styles from "./styles";
LogBox.ignoreAllLogs();

const AddReview = ({ route }) => {
  const cur = route.params.cloth.key;
  // console.log(cur);

  const [text, onChangeText] = useState("");
  const [content, onChangeContent] = useState("");
  const [uri, setUri] = useState("");
  const [clothes, setClothes] = useState([]);
  const imageHandler = (uri) => {
    // console.log("imageHandler called", uri);
    setUri(uri);
  };

  const onAdd = async function (cur) {
    await addreviewToDB({cur
    });
  };

  return (
    <SafeAreaView style={styles.addNew}>
      <View style={styles.addNewTitle}>
        <Text>Title</Text>
        <TextInput
          value={text}
          onChangeText={(newText) => {
            onChangeText(newText);
          }}
          placeholder="THIS FIT IS IN THE NAME! GOTTA HAVE IT!"
        />
      </View>

      <View style={styles.addNewImage}>
        <ImageManager imageHandler={imageHandler} />
      </View>

      <View style={styles.addNewContent}>
        <Text>Content</Text>
        <TextInput
          value={content}
          onChangeText={(newContent) => {
            onChangeContent(newContent);
          }}
          placeholder="Enter the information about this item!"
        />
      </View>

      <View style={styles.addNewSubmit}>
        <Pressable
          onPress={() => {
            const review = {
              toClothes:cur,
              title: text,
              uri: uri,
              content: content,
            };
            onAdd(review);
            Alert.alert("New Review added successfully!");
          }}
          disabled={text.length ? false : true}
        >
          <Text style={styles.blueButton}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddReview;
