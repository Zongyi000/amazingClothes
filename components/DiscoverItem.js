import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { useNavigation } from "@react-navigation/native";
import { addLikesToDB } from '../Firebase/firestore';
import { addDislikesToDB } from '../Firebase/firestore';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/EvilIcons";
import styles from '../styles/styles';

function DiscoverItem({ cloth }) {
  const cur = cloth.imageUri;
  const navigation = useNavigation();
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    const getImageURL = async () => {
      try {
        if (cur) {
          const imageName = cur.substring(7, cur.length - 4) + "_200x200" + cur.substring(cur.length - 4, cur.length);
          const reference = ref(storage, `images/${imageName}`);
          await getDownloadURL(reference).then((x) => {
            setImageURL(x);
          })
        }
      } catch (err) {
        console.log("download image ", err);
      }
    };
    getImageURL();
  }, []);
  const username = cloth.user.substring(0,4);
  const clothname = cloth.title;

  return (

    <Pressable onPress={() => {

      navigation.navigate("ReviewScreen", { cloth });
    }}
      android_ripple={{ color: "black", foreground: true }}
    >
                <View style={styles.discovercontainer}>
            <Text style={styles.titleStyle}>{clothname}</Text>
            <View style={styles.centerContentStyle}>
              <FontAwesomeIcon icon={faMugSaucer} />
              <Text style={styles.TextStyle}>Posted by {username}</Text>
            </View>
          </View>
      <View style={styles.card}>
        <ImageBackground
          style={styles.back}
          source={{
            uri: imageURL
          }}
        >

          <View style={styles.cardFooter}>
            <View style={styles.cardFooterLeft}>
              <View>

                <Ionicons.Button
                  name="heart-outline"
                  size="30"
                  color="red"
                  onPress={async () => {
                    await addLikesToDB(cloth);
                    setisLiked(True)
                  }}
                />

                <Ionicons.Button
                  name="heart-dislike-outline"
                  size="30"
                  color="black"
                  onPress={async () => {
                    await addDislikesToDB(cloth);
                  }}
                />

                <Icon.Button
                  name="comment"
                  size="30"
                  color="black"
                  onPress={() => {
                    navigation.navigate("AddReview", { cloth });
                  }}
                />

              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
}

export default DiscoverItem;
