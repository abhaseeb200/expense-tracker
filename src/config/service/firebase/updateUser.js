import { auth, db } from "../../firebaseConfig"
import getUserByID from "./getUserByID"

const updateUser = (firstName,lastName,username,phone,address, docID) => {
    return db.collection("users").doc(docID).update({
        fname: firstName,
        lname: lastName,
        username: username,
        address:address,
        phone:phone,
    })
}

const updateUserWithImage = (firstName,lastName,username,phone,address, imageURL,docID) => {
    return db.collection("users").doc(docID).update({
        fname: firstName,
        lname: lastName,
        username: username,
        address:address,
        phone:phone,
        profileURL: imageURL,
    })
}


export {updateUser, updateUserWithImage}