import { db } from "../../firebaseConfig";

const setBudget = (name, date, amount, currentUserID) => {
  return db.collection("budget").add({
    userId: currentUserID,
    timeStamp: Date.now(),
    name: name,
    date: date,
    amount: amount,
  });
};

const getBudget = (currentUserID) => {
  return db
    .collection("budget")
    .where("userId", "==", currentUserID)
    .orderBy("timeStamp", "desc")
    .get();
};

export { setBudget, getBudget };
