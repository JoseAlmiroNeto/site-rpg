import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/database";
import "firebase/storage";

export const firebaseConfig = {};

export const authConfig = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore(authConfig);
export const storage = firebase.storage(authConfig);
