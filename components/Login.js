import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCred);
      // signInWithEmailAndPassword
      Alert.alert("Welcome!");
    } catch (err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  };
  return (
    <View style={styles.authContent}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(newEmail) => setEmail(newEmail)}
        value={email}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(newPass) => setPassword(newPass)}
        value={password}
        placeholder="Password"
      />
      <View style={styles.button}>
        <Button title="Log In" onPress={handleLogin} />
      </View>
      <View style={styles.button}>
        <Button
          title="New User? Create an account"
          onPress={() => navigation.replace("Signup")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    width: '80%'
  },
  label: {
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    marginTop: 5,
  },
});