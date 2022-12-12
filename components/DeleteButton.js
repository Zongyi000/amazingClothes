import { View, StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/styles";

export default function DeleteButton({ onDeletePressed }) {
  return (
    <Pressable
      onPress={onDeletePressed}
      style={({ pressed }) => {
        return pressed && styles.pressedItm;
      }}
      android_ripple={{ color: "#223355", foreground: true }}
    >
      <View style={styles.button}>
        <MaterialIcons name="delete-outline" size={24} color="black" />
      </View>
    </Pressable>
  );
}

