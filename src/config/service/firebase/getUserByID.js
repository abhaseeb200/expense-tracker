import { db } from "../../firebaseConfig"

const getUserByID = () => {
    let localUserId = localStorage.getItem("currentUser")
    return db.collection("users").where("userId","==",localUserId).get()
}
export default getUserByID