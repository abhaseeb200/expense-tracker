import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAr4pwo4scxlSI7D-kn9eBg4uMtBr8PaPI",
  authDomain: "react-expenser-tracker.firebaseapp.com",
  projectId: "react-expenser-tracker",
  storageBucket: "react-expenser-tracker.appspot.com",
  messagingSenderId: "652291453516",
  appId: "1:652291453516:web:c44e7073a4bba1fcf8bae9"
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore();
export const storage = firebase.storage();