import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from "react-native-dotenv";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,       
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const myApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(myApp);
export const auth = initializeAuth(myApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage();