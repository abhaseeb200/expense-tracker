import { db } from "../../firebaseConfig";

const addTransactionAPI = (body) => {
  return db.collection("transaction").add(body);
};

const getTransactionAPI = (userId) => {
  return db
    .collection("transaction")
    .where("userId", "==", userId)
    .orderBy("timeStamp", "desc")
    .get();
};

const deleteTransactionAPI = (docId) => {
  return db.collection("transaction").doc(docId).delete();
};

const updateTransactionAPI = (body, docId) => {
  return db.collection("transaction").doc(docId).update(body);
};

export { addTransactionAPI, getTransactionAPI, deleteTransactionAPI, updateTransactionAPI };
