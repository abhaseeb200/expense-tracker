import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "react-xpensr-system.firebaseapp.com",
  projectId: "react-xpensr-system",
  storageBucket: "react-xpensr-system.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID 
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore();
export const storage = firebase.storage();