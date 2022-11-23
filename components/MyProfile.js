import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles'
import { auth } from "../Firebase/firebase-setup";
import {signOut} from "firebase/auth";

export default MyProfile = () =>
  <View style={styles.center}>
    {/* <Text style={styles.title}>MyProfile</Text> */}
    <Text>{auth.currentUser.email}</Text>
    <Text>{auth.currentUser.uid}</Text>
    <Button title="Logout" onPress={() => signOut(auth)} />
  </View>

