import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editUserReducer } from "../feature/auth/userSlice";
import { updateUserAPI } from "../config/service/firebase/user";

const useUser = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state?.auth);

  const useUpdateUser = async (body) => {
    try {
      setLoading(true);
      await updateUserAPI(body, userData?.docId);
      dispatch(editUserReducer(body));
      toast.success("Update successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    useUpdateUser,
    loading,
  };
};

export default useUser;
