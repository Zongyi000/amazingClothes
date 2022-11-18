import { collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase-setup";

export async function writeToDB(cloth) {
    try {
      const docRef = await addDoc(collection(firestore, "clothes"), cloth);
    } catch (err) {
      console.log(err);
    }
}
  
export async function deleteFromDB(key) {
  try {
    await deleteDoc(doc(firestore, "clothes", key));
  } catch (err) {
    console.log(err);
  }
}

export async function editImportanceFromDB(key) {
  try {
    await updateDoc(doc(firestore, "clothes", key));
  } catch (err) {
    console.log(err);
  }
}