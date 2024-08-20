import { db } from "../../firebaseConfig";

const addSourceAPI = (body) => {
  return db.collection("source").add(body);
};

const getSourceAPI = (userId) => {
  return db
    .collection("source")
    .where("userId", "==", userId)
    .orderBy("timeStamp", "desc")
    .get();
};

const deleteSourceAPI = (docId) => {
  return db.collection("source").doc(docId).delete();
};

const updateSourceAPI = (body, docId) => {
  return db.collection("source").doc(docId).update(body);
};

export { addSourceAPI, getSourceAPI, deleteSourceAPI, updateSourceAPI };
