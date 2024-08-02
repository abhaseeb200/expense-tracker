import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editUserReducer, getUserReducer } from "../feature/auth/userSlice";
import {
  addUserAPI,
  getUserById,
  updateUserAPI,
} from "../config/service/firebase/user";

const useUser = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state?.auth);

  const useGetUser = async (id) => {
    try {
      setLoading(true);
      let response = await getUserById(id);
      let data = {};
      response.forEach((element) => {
        console.log(element);
        data = {
          ...element.data(),
          docId: element.id,
        };
      });
      dispatch(getUserReducer(data));
      toast.success("Login successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const useAddUser = async (body) => {
    try {
      setLoading(true);
      await addUserAPI(body);
      dispatch(getUserReducer(body));
      toast.success("Signup successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

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
    useGetUser,
    useAddUser,
    useUpdateUser,
    loading,
  };
};

export default useUser;
