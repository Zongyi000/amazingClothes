import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAt_U-2vf40pQ4EcUnBapA_MkQ5LH4LLt8",
  authDomain: "amazingclothes-705ac.firebaseapp.com",
  projectId: "amazingclothes-705ac",
  storageBucket: "amazingclothes-705ac.appspot.com",
  messagingSenderId: "591583759383",
  appId: "1:591583759383:web:169471b50cc39fb2d0e052",
  // measurementId: "G-965ZKNWTEV"
  };
let myApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(myApp);
export const auth = initializeAuth(myApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});