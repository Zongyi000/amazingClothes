import React, { useState, useEffect } from "react";
import { FlatList,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscoverItem from "./DiscoverItem";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase/firebase-setup";

export default function Discover() {
  const [clothes, setClothes] = useState([]);
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

  const curclothes = 0;
  return (
      <FlatList
        data={clothes}
        renderItem={({ item }) => {
          return (
            <DiscoverItem cloth={item} />
          );
        }}
        keyExtractor={item => item.id}
      />
  );
}

