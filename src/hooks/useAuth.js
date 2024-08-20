import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserReducer } from "../feature/auth/userSlice";
import { authSignIn, authSignUp } from "../config/service/firebase/auth";
import { addUserAPI, getUserById } from "../config/service/firebase/user";

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

  return {
    useSignIn,
    useSignUp,
    loading,
  };
};

export default useAuth;
