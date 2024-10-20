import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6jtg2dUGnNPvNLBltJ2oCZvt7cCzQ-7c",
  authDomain: "vinie-44385.firebaseapp.com",
  projectId: "vinie-44385",
  storageBucket: "vinie-44385.appspot.com",
  messagingSenderId: "234368757791",
  appId: "1:234368757791:web:bc5dd7e9d365122584652a",
  measurementId: "G-FWZG88H75H",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtDB = getDatabase(app);