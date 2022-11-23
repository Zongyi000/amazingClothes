import React, { useState, useEffect } from 'react';
import {  View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ClothItem from './ClothItem';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase-setup';

export default function Top10BestSeller () {

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

  const name = "clothes list";
  return (
      <SafeAreaView>
         <View >
              <FlatList 
                  data={clothes}
                  // style={styles.container}
                  renderItem = {({ item }) => {
                      return (
                          <ClothItem
                              cloth={item}
                              // onItemPress={itemPressed}
                          />
                      );
                  }}
                  // contentContainerStyle={styles.scrollViewItems}
              >
              </FlatList>
          </View>
      </SafeAreaView>
  );
}
