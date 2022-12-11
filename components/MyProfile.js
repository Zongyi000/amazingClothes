import {signOut} from "firebase/auth";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore, auth, storage } from '../Firebase/firebase-setup';
import { deleteFromDB } from "../Firebase/firestore";
import NotificationManager from "./NotificationManager";
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  Button
} from 'react-native';
import ClothItem from './ClothItem';
import styles from "../styles/styles";

export default function MyProfile () {
  const [clothes, setClothes] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "clothes"),
        where("user", "==", auth.currentUser.uid)
      ),
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
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  async function onDelete(deletedKey) {
    await deleteFromDB(deletedKey);
  }

  const email = auth.currentUser.email;
  const currentName = email.match(/^([^@]*)@/)[1];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.profileContainer}>
          <Image
            style={styles.userImg}
            source={{uri: 'https://gravatar.com/avatar/78a296d008e5796f3f3e2d849819e9dc?s=400&d=mp&r=x'}}
          />
        <Text style={styles.userName}>{currentName}</Text>
      </View>
      <Button title="Logout" onPress={() => signOut(auth)} />
      <NotificationManager clothes={clothes} />
      <FlatList 
        data={clothes?.filter(data => data?.user === auth.currentUser.uid)}
        keyExtractor = {item=>item.id}
        renderItem = {({ item }) => {
          return (
            <ClothItem
              cloth={item}
              onDelete={onDelete}
              showResult={true}
            />
          );
        }}
      >
      </FlatList>
      </SafeAreaView>
  );
}