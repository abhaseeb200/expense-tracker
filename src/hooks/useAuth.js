import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserReducer } from "../feature/auth/userSlice";
import { authSignIn, authSignUp } from "../config/service/firebase/auth";
import { addUserAPI, getUserById } from "../config/service/firebase/user";
import { auth, db, googleProvider } from "../config/firebaseConfig";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  //WHEN USER IS LOGIN: GET USER DETAILS FROM 'FIREBASE-USER-COLLECTION'
  //AUTO REDIRECTION: DUE TO 'PRIVATE-ROUTE' OR 'PUBLIC-ROUTE' CONDITIONS
  const useSignIn = async (email, password) => {
    try {
      setLoading(true);
      let response = await authSignIn(email, password);
      let userResponse = await getUserById(response?.user?.uid);
      let data = {};
      await userResponse.forEach((element) => {
        data = {
          ...element.data(),
          docId: element.id,
        };
      });
      dispatch(getUserReducer(data));
      toast.success("Login successfully!");
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  //WHEN USER IS SIGN-UP: ADD USER DETAILS TO 'FIREBASE-USER-COLLECTION'
  //AUTO REDIRECTION: DUE TO 'PRIVATE-ROUTE' OR 'PUBLIC-ROUTES' CONDITIONS
  const useSignUp = async (data) => {
    try {
      setLoading(true);
      let response = await authSignUp(data?.email, data?.password);
      let body = {
        userId: response.user.uid,
        username: data?.username,
        email: data?.email,
        fname: "",
        lname: "",
        phone: "",
        profileURL: "",
        address: "",
      };
      await addUserAPI(body);
      await dispatch(getUserReducer(body));
      toast.success("Signup successfully!");
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result?.user;
      const userRef = db.collection("users").doc(user?.uid);

      await userRef.set(
        {
          userId: user?.uid,
          fname: user?.displayName.split(" ")[0],
          lname: user?.displayName.split(" ")[1],
          profileURL: user?.photoURL,
          email: user?.email,
        },
        { merge: true }
      );

      //FETCH USER DETAILS
      let userResponse = await getUserById(user?.uid);
      let data = {};
      await userResponse.forEach((element) => {
        data = {
          ...element.data(),
          docId: element.id,
        };
      });
      dispatch(getUserReducer(data));
      toast.success("Login successfully!");
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  return {
    useSignIn,
    useSignUp,
    signInWithGoogle,
    loading,
  };
};

export default useAuth;
