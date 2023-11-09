import { auth, db } from "../../firebaseConfig"
import getUserByID from "./getUserByID"

const updateUser = (username) => {
    // getUserByID().then((res) => {
    //     db.collection("users").doc(res.docs[0].id).update({
    //         username: username,
    //     })
    // })

}
export default updateUser