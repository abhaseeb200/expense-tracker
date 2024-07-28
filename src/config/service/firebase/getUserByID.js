import { db } from "../../firebaseConfig";

const getUserById = (id) => {
  return db.collection("users").where("userId", "==", id).get();
};
export default getUserById;
