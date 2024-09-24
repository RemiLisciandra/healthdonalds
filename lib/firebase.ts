import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuORauu9RZ9ly5LUA4M-D1GIiIpu6iawc",
  authDomain: "healthdonalds-remi-lcd.firebaseapp.com",
  projectId: "healthdonalds-remi-lcd",
  storageBucket: "healthdonalds-remi-lcd.appspot.com",
  messagingSenderId: "49318259700",
  appId: "1:49318259700:web:765e7eab295c0108e067a1",
  measurementId: "G-N0TYLS93TS",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
