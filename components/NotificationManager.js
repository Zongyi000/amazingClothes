import { View, Button } from "react-native";
import React, { useState, useEffect } from 'react';
import * as Notifications from "expo-notifications";
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase-setup';

export default function NotificationManager() {
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

  const verifyPermission = async () => {
    const permissionStatus = await Notifications.getPermissionsAsync();
    if (permissionStatus.granted) {
      return true;
    }
    const requestedPermission = await Notifications.requestPermissionsAsync({
      ios: {
        allowBadge: true,
      },
    });
    return requestedPermission.granted;
  };

  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }


      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Current Clothes Number Notification",
          body: `There are ${clothes.length} clothes in our database now!`,
          color: "red",
          data: { url: "https://github.com/Zongyi000/amazingClothes" },
        },
        trigger: {
          seconds: 5,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Button
        title="Check Current Clothes Number"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}