import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";


const authSignUp = (email, password, username, setLoader) => {
    const navigate = useNavigate();
    console.log(email, password, username);
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log(user.uid, "useriD")
            db.collection("users").add({
                username: username,
                email: email,
                userId: user.uid,
                fname: "",
                lname: "",
                phone: "",
                profileURL: "",
                address: "",
            }).then((res) => {
                console.log(res);
                // navigate("/", { replace: true })
            })
        }).catch((err) => {
            console.log(err);
            setLoader(false)
        })
}

const authSignIn = (email, password, setLoader) => {
    auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
            setLoader(false)
        })
}

const authLogout = () => {
    return auth.signOut()

}

export { authSignIn, authSignUp, authLogout }