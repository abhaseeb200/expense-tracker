import { db } from "../../firebaseConfig"

let currentUserId = localStorage.getItem("currentUser")

const setTransaction = (name, category, date, amount, type) => {
    return db.collection("transaction").add({
        userId: currentUserId,
        timeStamp: Date.now(),
        name: name,
        category: category,
        date: date,
        amount: amount,
        type: type
    })
}

const getTransaction = () => {
    return db.collection("transaction")
        .where("userId", "==", currentUserId)
        .orderBy("timeStamp", "desc")
        .get()
}

const deleteTransaction = (docId) => {
    return db.collection("transaction")
    .doc(docId)
    .delete()
}

const updateTransaction = (name,type,category,date,amount,docId) => {
    return db.collection("transaction")
    .doc(docId)
    .update({
        name:name,
        type:type,
        category:category,
        date:date,
        amount:amount,
    })
}

const setTransactionCategory = (name, category) => {
    return db.collection("transactionCategory").add({
        name: name,
        category: category,
        timeStamp: Date.now(),
        userId: currentUserId
    })
}

const getTransactionCategory = () => {
    return db.collection("transactionCategory")
        .where("userId", "==", currentUserId)
        .orderBy("timeStamp", "desc")
        .get()
}

export { setTransaction, getTransaction, deleteTransaction, updateTransaction, setTransactionCategory, getTransactionCategory }