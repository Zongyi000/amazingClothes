
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore, auth, storage } from '../Firebase/firebase-setup';
import React, {useState, useEffect} from 'react';
import { getDownloadURL, ref } from "firebase/storage";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/EvilIcons";

export default function ReviewScreen ({route}) {
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

  const cur = cloth.imageUri;
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

  console.log(reviews)
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container }>
        <Image
            style={styles.reviewImg}
            source={{uri: imageURL !== ""? imageURL : 'https://reactnative.dev/img/tiny_logo.png',}}
        />
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
          <Text style={styles.userInfoTitle}>{cloth.title}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{cloth.likes}</Text>
            <Ionicons.Button
                  name = "heart-outline"
                  size = "20"
                  color = "red"
                /> 
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{cloth.dislikes}</Text>
            <Ionicons.Button
                  name="heart-dislike-outline"
                  size = "20"
                  color = "black"
                />
          </View>
        </View>
        <Text style={styles.userInfoTitle}>Reviews</Text>
        <FlatList 
            data={reviews}
            renderItem={({ item }) => {
            return (
                    <View>
                        <Text style={styles.userInfoSubTitle}>Title: "{item.cur.title}" </Text>
                        <Text style={styles.userInfoSubTitle}>Content: "{item.cur.content !== "" ? item.cur.content : null}". </Text>
                        <Text style={styles.userInfoSubTitle}>--posted by {item.user[8]}{item.user[9]}{item.user[10]}</Text>
                    </View>

            );
            }}
            keyExtractor = {item=>item.id}
        />
      </View>
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  reviewImg: {
    height: 250,
    width:250,
    borderRadius: 45,
    marginTop: 25,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});