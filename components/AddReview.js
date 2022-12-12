import { addreviewToDB } from "../Firebase/firestore";
import React from "react";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
} from "react-native";
import ImageManager from "./ImageManager";
import { LogBox } from "react-native";
import styles from "../styles/styles";
LogBox.ignoreAllLogs();

const AddReview = ({ route }) => {
  const cur = route.params.cloth.key;
  const [text, onChangeText] = useState("");
  const [content, onChangeContent] = useState("");
  const [uri, setUri] = useState("");
  const imageHandler = (uri) => {
    setUri(uri);
  };

  const onAdd = async function (cur) {
    await addreviewToDB({ cur });
  };

  return (
    <ScrollView style={styles.addNew}>
      <View style={styles.addNewTitle}>
        <Text>Title</Text>
        <TextInput
          value={text}
          onChangeText={(newText) => {
            onChangeText(newText);
          }}
          placeholder="Something important to share"
        />
      </View>

      <View style={styles.addNewImage}>
        <ImageManager imageHandler={imageHandler} />
      </View>

      <View style={styles.addNewContent}>
        <Text>Why you love it?</Text>
        <TextInput
          value={content}
          onChangeText={(newContent) => {
            onChangeContent(newContent);
          }}
          placeholder="Enter the information about this lover!"
        />
      </View>

      <View style={styles.addNewSubmit}>
        <Pressable
          onPress={() => {
            const review = {
              toClothes: cur,
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
    </ScrollView>
  );
};

export default AddReview;
