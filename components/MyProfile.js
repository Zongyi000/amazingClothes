import {signOut} from "firebase/auth";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore, auth, storage } from '../Firebase/firebase-setup';
import { deleteFromDB } from "../Firebase/firestore";
// export default MyProfile = () =>
//   <View style={styles.center}>
//     {/* <Text style={styles.title}>MyProfile</Text> */}
//     <Text>{auth.currentUser.email}</Text>
//     <Text>{auth.currentUser.uid}</Text>
//     <Button title="Logout" onPress={() => signOut(auth)} />
//   </View>

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button
} from 'react-native';
import ClothItem from './ClothItem';

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
    console.log("delete pressed ", deletedKey);
    await deleteFromDB(deletedKey);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
          <Image
            style={styles.userImg}
            source={{uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
          />
        <Text style={styles.userName}>User Name</Text>
        <Text>{auth.currentUser.uid}</Text>
        <Text>{auth.currentUser.email}</Text>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
          <Text style={styles.userInfoTitle}>5</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Likes</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Dislikes</Text>
          </View>
        </View>
      </View>
      <Button title="Logout" onPress={() => signOut(auth)} />
      <FlatList 
        data={clothes?.filter(data => data?.user === auth.currentUser.uid)}
        renderItem = {({ item }) => {
          return (
            <ClothItem
              cloth={item}
              onDelete={onDelete}
              showResult={true}
            />
          );
        }}
        // contentContainerStyle={styles.scrollViewItems}
      >
      </FlatList>
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
  userImg: {
    height: 75,
    width: 75,
    borderRadius: 75,
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