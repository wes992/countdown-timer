import { initializeApp } from "firebase/app";
import { getDocs, collection, getFirestore, addDoc } from "firebase/firestore";
import firebaseConfig from "./config";

initializeApp(firebaseConfig);
export const db = getFirestore();

export const getCollection = (_collection) => collection(db, _collection);

export const getDataInCollection = async (collection, input) => {
  let data = [];
  try {
    const snapShot = await getDocs(getCollection(collection));
    data = snapShot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    return data;
  }
};

export const addDataToCollection = (collection, docToAdd) => {
  try {
    addDoc(getCollection(collection), docToAdd);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("made it to finally");
  }
};

// export default app;
