import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserReducer } from "../feature/auth/userSlice";
import { authSignIn, authSignUp } from "../config/service/firebase/auth";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const useSignIn = async (email, password) => {
    try {
      setLoading(true);
      let response = await authSignIn(email, password);
      let data = {
        userId: response.user.uid,
        ...response?.user?.providerData[0],
      };
      dispatch(getUserReducer(data));
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  const useSignUp = async (data) => {
    try {
      setLoading(true);
      let response = await authSignUp(data?.email, data?.password);
      let modified = {
        userId: response.user.uid,
        username: data?.username,
        ...response?.user?.providerData[0],
      };
      dispatch(getUserReducer(modified));
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
