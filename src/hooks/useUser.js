import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../feature/auth/userSlice";
import getUserById from "../config/service/firebase/getUserByID";
import { addUserAPI } from "../config/service/firebase/user";
import { useNavigate } from "react-router-dom";

// THIS HOOK IS USED FOR USER DETAILS.
// SEPARATE COLLECTION FOR USER DETAILS.
// AFTER THE SIGN-IN OR SIGN-UP GET, EDIT OR ADD USER DETAILS.

const useUser = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const useGetUser = async (id) => {
    try {
      setLoading(true);
      let response = await getUserById(id);
      console.log({ response });
    //   let data = {
    //     userId: response.user.uid,
    //     ...response?.user?.providerData[0],
    //   };
    //   dispatch(getUserProfile(data));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const useAddUser = async (body) => {
    try {
      setLoading(true);
      let response = await addUserAPI(body);
      console.log({ response });
      console.log({ body });
      dispatch(getUserProfile(body));
      toast.success("Signup successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    useGetUser,
    useAddUser,
    loading,
  };
};

export default useUser;
