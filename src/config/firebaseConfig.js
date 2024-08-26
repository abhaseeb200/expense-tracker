import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB2gkaxcrUPs27J1dzr7cApF9vDA9Vk1EU",
  authDomain: "react-xpensr-system.firebaseapp.com",
  projectId: "react-xpensr-system",
  storageBucket: "react-xpensr-system.appspot.com",
  messagingSenderId: "760878505426",
  appId: "1:760878505426:web:07da5fab4b1ef4dcabfc0b" 
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore();
export const storage = firebase.storage();