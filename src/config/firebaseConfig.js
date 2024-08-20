import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "react-xpensr-system.firebaseapp.com",
  projectId: "react-xpensr-system",
  storageBucket: "react-xpensr-system.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore();
export const storage = firebase.storage();