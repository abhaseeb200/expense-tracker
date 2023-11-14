import { auth, db } from "../../firebaseConfig"

const getUserByID = (currentUserID) => {
    return db.collection("users").where("userId","==",currentUserID).get()
}
export default getUserByID