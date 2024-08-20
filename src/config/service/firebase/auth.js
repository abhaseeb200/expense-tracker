import { auth } from "../../firebaseConfig";

const authSignUp = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const authSignIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const authLogout = () => {
  return auth.signOut();
};

export { authSignIn, authSignUp, authLogout };