import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authSignUp } from "../config/service/firebase/auth";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const useSignIn = async (email, password) => {
    try {
      setLoading(true);
      let response = await authSignUp(email, password);
      console.log(response);
      //   let user = auth.currentUser;
      //   userData = {
      //     userId: user.uid,
      //   };
      //   dispatch(getUserProfile(userData));
      toast.success("Login successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    useSignIn,
    loading,
  };
};

export default useAuth;
