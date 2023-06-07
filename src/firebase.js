import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb8vXA0h99titKY2AYU7xSpp9rtcmJiOs",
  authDomain: "chat-cf7eb.firebaseapp.com",
  projectId: "chat-cf7eb",
  storageBucket: "chat-cf7eb.appspot.com",
  messagingSenderId: "251271534191",
  appId: "1:251271534191:web:31209eac5299597a13df9a",
  measurementId: "G-8ZJNK5PGCP",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
