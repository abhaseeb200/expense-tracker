import { db } from "../../firebaseConfig";

const addCategoryAPI = (data) => {
  return db.collection("transactionCategory").add({
    ...data,
    timeStamp: Date.now(),
  });
};

const getCategoryAPI = (userId) => {
  return db
    .collection("transactionCategory")
    .where("userId", "==", userId)
    .orderBy("timeStamp", "desc")
    .get();
};

const deleteCategoryAPI = (docId) => {
  return db.collection("transactionCategory").doc(docId).delete();
};

const updateCategoryAPI = (data, docId) => {
  return db.collection("transactionCategory").doc(docId).update(data);
};

export { addCategoryAPI, getCategoryAPI, deleteCategoryAPI, updateCategoryAPI };
