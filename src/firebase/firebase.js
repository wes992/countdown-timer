import { initializeApp } from "firebase/app";
import {
  getDocs,
  collection,
  getFirestore,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "./config";

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

export const addDataToCollection = async (collection, docToAdd) => {
  try {
    const result = await addDoc(getCollection(collection), docToAdd);

    if (!!result.id) {
      const newData = await getDataInCollection(collection);
      return { success: true, data: newData };
    }
  } catch (err) {
    console.log(err);
    return { success: false, data: err };
  }
};

export const deleteDataFromCollection = async (collection, docId) => {
  const docToDelete = doc(getCollection(collection), docId);
  try {
    await deleteDoc(docToDelete);
  } catch (err) {
    console.log(err);
  }
};

// export default app;
