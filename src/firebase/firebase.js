import { initializeApp } from "firebase/app";
import {
  getDocs,
  collection,
  getFirestore,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { getStorage, ref } from "firebase/storage";
import { firebaseConfig } from "./config";

export const useFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const storage = getStorage(app);

  const storageRef = ref(storage, "/images");
  const getCollection = (_collection) => collection(db, _collection);

  const getDataInCollection = async (collection, input) => {
    let data = [];
    try {
      const snapShot = await getDocs(getCollection(collection));
      const docData = snapShot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      data = { success: true, data: docData };
    } catch (err) {
      console.log(err.message);
      data = { success: false, data: err };
    }
    return data;
  };

  const addDataToCollection = async (collection, docToAdd) => {
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

  const deleteDataFromCollection = async (collection, docId) => {
    const docToDelete = doc(getCollection(collection), docId);
    try {
      await deleteDoc(docToDelete);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getCollection,
    getDataInCollection,
    addDataToCollection,
    deleteDataFromCollection,
  };
};

// export default app;
