import { View, Button } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export default function NotificationManager(clothes) {
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
          body: `There are ${clothes.clothes.length} clothes in our database now!`,
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