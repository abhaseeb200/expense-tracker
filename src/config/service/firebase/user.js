import { db } from "../../firebaseConfig";

const addUserAPI = (body) => {
  return db.collection("users").add(body);
};

const getUserById = (id) => {
  return db.collection("users").where("userId", "==", id).get();
};

export { addUserAPI, getUserById };
