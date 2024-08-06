import { db } from "../../firebaseConfig";

const addExpenseAPI = (body) => {
  return db.collection("transaction").add(body);
};

const getExpenseAPI = (userId) => {
  return db
    .collection("transaction")
    .where("userId", "==", userId)
    .orderBy("timeStamp", "desc")
    .get();
};

const deleteExpenseAPI = (docId) => {
  return db.collection("transaction").doc(docId).delete();
};

const updateExpenseAPI = (body, docId) => {
  return db.collection("transaction").doc(docId).update(body);
};

export {
  addExpenseAPI,
  getExpenseAPI,
  deleteExpenseAPI,
  updateExpenseAPI,
};
