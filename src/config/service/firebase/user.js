import { db } from "../../firebaseConfig";

const addUserAPI = (body) => {
  return db.collection("users").add(body);
};

export { addUserAPI };
