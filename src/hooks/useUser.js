import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../feature/auth/userSlice";
import getUserById from "../config/service/firebase/getUserByID";

const useUser = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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

  return {
    useGetUser,
    loading,
  };
};

export default useUser;
