
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore, storage } from '../Firebase/firebase-setup';
import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from "firebase/storage";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from '../styles/styles';

export default function ReviewScreen({ route }) {
  const cloth = route.params.cloth;
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "reviews"),
        where('cur.toClothes', "==", cloth.key)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setReviews([]);
          return;
        }
        setReviews(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data();
            data = { ...data, key: snapDoc.id };
            return data;
          })
        );
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  const cur = cloth.imageUri == null ? cloth.photoUri : cloth.imageUri;
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.reviewImg}
          source={{ uri: imageURL !== "" ? imageURL : 'https://reactnative.dev/img/tiny_logo.png', }}
        />
        <View style={styles.viewInfoWrapper}>
          <View style={styles.viewInfoItem}>
            <Text style={styles.viewInfoTitle}>{cloth.title}</Text>
          </View>
          <View style={styles.viewInfoItem}>
            <Text style={styles.viewInfoTitle}>{cloth.likes}</Text>
            <Ionicons.Button
              name="heart-outline"
              size="20"
              color="red"
            />
          </View>
          <View style={styles.viewInfoItem}>
            <Text style={styles.viewInfoTitle}>{cloth.dislikes}</Text>
            <Ionicons.Button
              name="heart-dislike-outline"
              size="20"
              color="black"
            />
          </View>
        </View>
        <Text style={styles.viewInfoTitle}>Reviews</Text>
        <FlatList
          data={reviews}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.viewInfoSubTitle}>Title: "{item.cur.title}" </Text>
                <Text style={styles.viewInfoSubTitle}>Content: "{item.cur.content !== "" ? item.cur.content : null}". </Text>
                <Text style={styles.viewInfoSubTitle}>--posted by {item.user[8]}{item.user[9]}{item.user[10]}</Text>
              </View>

            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}