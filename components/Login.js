import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import  styles  from "../styles/styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Welcome!");
    } catch (err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  };
  return (
    <View style={styles.authContent}>
      <Text style={styles.authLabel}>Email Address</Text>
      <TextInput
        placeholder="Email"
        style={styles.authInput}
        onChangeText={(newEmail) => setEmail(newEmail)}
        value={email}
        keyboardType="email-address"
      />
      <Text style={styles.authLabel}>Password</Text>
      <TextInput
        style={styles.authInput}
        secureTextEntry={true}
        onChangeText={(newPass) => setPassword(newPass)}
        value={password}
        placeholder="Password"
      />
      <View style={styles.authButton}>
        <Button title="Log In" onPress={handleLogin} />
      </View>
      <View style={styles.authButton}>
        <Button
          title="New User? Create an account"
          onPress={() => navigation.replace("Signup")}
        />
      </View>
    </View>
  );
}