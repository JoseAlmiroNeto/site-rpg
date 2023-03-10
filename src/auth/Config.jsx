import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/database";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAVF26vznnJx-oTXHN444taARI2xEGh0aE",
  authDomain: "ficharpg-9a0d5.firebaseapp.com",
  projectId: "ficharpg-9a0d5",
  storageBucket: "ficharpg-9a0d5.appspot.com",
  messagingSenderId: "946301894583",
  appId: "1:946301894583:web:829add471049a4f866b232",
  measurementId: "G-EXLXKBL4DX"
};

export const authConfig = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore(authConfig);
export const storage = firebase.storage(authConfig);
