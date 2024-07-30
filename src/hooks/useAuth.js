import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfile } from "../feature/auth/userSlice";
import { authSignIn, authSignUp } from "../config/service/firebase/auth";
import getUserById from "../config/service/firebase/getUserByID";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const useSignIn = async (email, password) => {
    try {
      setLoading(true);
      let response = await authSignIn(email, password);
      let data = {
        userId: response.user.uid,
        ...response?.user?.providerData[0],
      };
      let user = await getUserById(response?.user?.uid);
      user.forEach((element) => {
        data = {
          ...element.data(),
          docId: element.id,
        };
      });
      dispatch(getUserProfile(data));
      navigate("/", { replace: true });
      dispatch(getUserProfile(data));
      toast.success("Login successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
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
      dispatch(getUserProfile(modified));
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
