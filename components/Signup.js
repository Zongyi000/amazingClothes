import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import  styles  from "../styles/styles";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const handleSignup = async () => {
    if (password.length < 6) {
      Alert.alert("The password needs to be minimum 6 characters");
      return;
    }
    if (password !== confirmpassword) {
      Alert.alert("The password and confirmed password don't match");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (err) {
      console.log(err);
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
      <Text style={styles.authLabel}>password</Text>
      <TextInput
        style={styles.authInput}
        secureTextEntry={true}
        onChangeText={(newPass) => setPassword(newPass)}
        value={password}
        placeholder="Password"
      />
      <Text style={styles.authLabel}>Confirm password</Text>
      <TextInput
        style={styles.authInput}
        secureTextEntry={true}
        onChangeText={(newPass) => setConfirmPassword(newPass)}
        value={confirmpassword}
        placeholder="Password"
      />
      <Button title="Register" onPress={handleSignup} />
      <Button
        title="Already Registered? Login"
        onPress={() => navigation.replace("Login")}
      />
    </View>
  );
}