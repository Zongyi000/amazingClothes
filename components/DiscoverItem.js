import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { useNavigation } from "@react-navigation/native";
import { addLikesToDB } from '../Firebase/firestore';
import { addDislikesToDB } from '../Firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/EvilIcons";

function DiscoverItem({ cloth }) {
    const cur = cloth.imageUri;
    const navigation = useNavigation();

    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
        const getImageURL = async () => {
          try {
            if (cur){
              const imageName = cur.substring(cur.lastIndexOf("/") + 1);
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

      console.log(imageURL);
      const username = cloth.user;
      const clothname = cloth.title;
    return (
      <View style={styles.card}>
        <ImageBackground
          style={{ flex: 1 }}
          source={{
            uri: 
            imageURL
            // "https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg",
          }}
        >
          <View style={styles.container}>
            <Text style={styles.titleStyle}>{clothname}</Text>
            <View style={styles.centerContentStyle}>
              <FontAwesomeIcon icon={faMugSaucer} />
              <Text style={styles.TextStyle}>Posted by {username}</Text>
            </View>
          </View>
  
          <View style={styles.cardFooter}>
            <View style={styles.cardFooterLeft}>
              <View>
  
               <Ionicons.Button
                  name = "heart-outline"
                  size = "30"
                  color = "red"
                  onPress={async () => {
                    await addLikesToDB(cloth);
                    setisLiked(True)
                  }}
                />               
                
                <Ionicons.Button
                  name="heart-dislike-outline"
                  size = "30"
                  color = "black"
                  onPress={async () => {
                      await addDislikesToDB(cloth);
                    }}
                />
  
                <Icon.Button
                  name="comment"
                  size = "30"
                  color = "black"
                  onPress={() => {
                      navigation.navigate("AddReview", { cloth });
                    }}
                />
  
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    titleStyle: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      padding: 10,
    },
    centerContentStyle: {
      justifyContent: "center",
      alignItems: "center",
    },
  
    card: {
      flex: 1,
      backgroundColor: "#e9eeef",
      // margin:15,
      // marginHorizontal:25,
    },
    cardHearder: {
      flex: 1,
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginHorizontal: 20,
    },
    headerLeft: {
      alignItems: "flex-start",
      width: 100,
      height: 20,
    },
    headerRight: {
      alignItems: "flex-end",
      width: 100,
      height: 20,
    },
    userImage: {
      width: 20,
      height: 20,
    },
  
    cardFooter: {
      flex: 1,
    },
    cardFooterLeft: {
      flexDirection: "row-reverse",
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    tinyLogo: {
      flex: 8,
      width: 250,
      height: 250,
    },
  });
  
export default DiscoverItem;
