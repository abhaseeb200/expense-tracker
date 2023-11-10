import { db } from "../../firebaseConfig";

let currentUserId = localStorage.getItem("currentUser");

const setBudget = (name, date, amount) => {
  return db.collection("budget").add({
    userId: currentUserId,
    timeStamp: Date.now(),
    name: name,
    date: date,
    amount: amount,
  });
};

const getBudget = () => {
  return db
    .collection("budget")
    .where("userId", "==", currentUserId)
    .orderBy("timeStamp", "desc")
    .get();
};

export { setBudget, getBudget };
