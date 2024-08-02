import { db } from "../../firebaseConfig";

const addUserAPI = (body) => {
  return db.collection("users").add(body);
};

const getUserById = (id) => {
  return db.collection("users").where("userId", "==", id).get();
};

const updateUserAPI = (body, docId) => {
  return db.collection("users").doc(docId).update(body);
};

export { addUserAPI, getUserById, updateUserAPI };
