import { db } from "../../firebaseConfig";
import { store } from "../../store";

// console.log(store.getState(),"++++++");

const addBudgetAPI = (body, userId) => {
  return db.collection("budget").add({ ...body, userId: userId });
};

const getBudgetAPI = (userId) => {
  return db
    .collection("budget")
    .where("userId", "==", userId)
    .orderBy("timeStamp", "desc")
    .get();
};

const deleteBudgetAPI = (docId) => {
  return db.collection("budget").doc(docId).delete();
};

const updateBudgetAPI = (body, docId) => {
  return db.collection("budget").doc(docId).update(body);
};

export { addBudgetAPI, getBudgetAPI, deleteBudgetAPI, updateBudgetAPI };
