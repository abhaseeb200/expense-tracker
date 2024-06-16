import { auth, db } from "../../firebaseConfig";


const setTransaction = (name, category, date, amount, type, currentUserID) => {
  return db.collection("transaction").add({
    userId: currentUserID,
    timeStamp: Date.now(),
    name: name,
    category: category,
    date: date,
    amount: amount,
    type: type,
  });
};

const getTransaction = (currentUserID) => {
  return db
    .collection("transaction")
    .where("userId", "==", currentUserID)
    .orderBy("timeStamp", "desc")
    .get();
};

const deleteTransaction = (docId) => {
  return db.collection("transaction").doc(docId).delete();
};

const updateTransaction = (name, type, category, date, amount, docId) => {
  return db.collection("transaction").doc(docId).update({
    name: name,
    type: type,
    category: category,
    date: date,
    amount: amount,
  });
};

const setTransactionCategory = (name, category, currentUserId) => {
  return db.collection("transactionCategory").add({
    name: name,
    category: category,
    timeStamp: Date.now(),
    userId: currentUserId,
  });
};

const getTransactionCategory = (currentUserID) => {
  return db
    .collection("transactionCategory")
    .where("userId", "==", currentUserID)
    .orderBy("timeStamp", "desc")
    .get();
};

const deleteTransactionCatgory = (docId) => {
  return db.collection("transactionCategory").doc(docId).delete();
};

const updateTransactionCategory = (name, category, docId) => {
  return db.collection("transactionCategory").doc(docId).update({
    name: name,
    category: category,
  });
};

export {
  setTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
  setTransactionCategory,
  getTransactionCategory,
  deleteTransactionCatgory,
  updateTransactionCategory
};
