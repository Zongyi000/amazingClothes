import { FirebaseError } from "firebase/app";
import { collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { firestore, auth } from "./firebase-setup";

export async function writeToDB(cloth) {
    try {
      const docRef = await addDoc(collection(firestore, "clothes"), {
        ...cloth,
        user: auth.currentUser.uid,
      });
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

export async function addLikesToDB(cur) {
  const num = cur.likes
  try {
    await updateDoc(
      doc(firestore, "clothes", `${cur.key}`),
      { likes: 1 + num },
      { merge: true }
    );
    // console.log("add likes ok")
  } catch (err) {
    console.log(err);
  }
}

export async function addDislikesToDB(cur) {
  const num = cur.dislikes
  try {
    await updateDoc(
      doc(firestore, "clothes", `${cur.key}`),
      { dislikes: 1 + num },
      { merge: true }
    );
    // console.log("add dilikes ok")
  } catch (err) {
    console.log(err);
  }
}

export async function addreviewToDB(review) {
  try {
    const docRef = await addDoc(collection(firestore, "reviews"), {
      ...review,
      user: auth.currentUser.uid,
    });
    // console.log("add review ok")
  } catch (err) {
    console.log(err);
  }
}