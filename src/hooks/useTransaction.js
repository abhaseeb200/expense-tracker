import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useTransition = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state?.auth?.userData);

  const useGetTransaction = async () => {
    try {
      setInitLoading(true);
      let transaction = [];
      // let response = await getExpenseAPI(userId);
      // response.forEach((element) => {
      //   transaction.push({
      //     docId: element.id,
      //     ...element.data(),
      //     amount: +element.data()?.amount,
      //   });
      // });
      // dispatch(getExpenseReducer(transaction));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setInitLoading(false);
    }
  };

  const useAddTransaction = async (body, setValues) => {
    try {
      setLoading(true);
      // let response = await addExpenseAPI(body);
      // dispatch(addExpenseReducer({ ...body, docId: response?.id }));
      setValues({});
      toast.success("Create successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const useUpdateTransaction = async (body, docId) => {
    try {
      setLoading(true);
      // await updateExpenseAPI(body, docId);
      // dispatch(updateExpenseReducer({ ...body, docId: docId }));
      toast.success("Update successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const useDeleteTransaction = async (docId) => {
    try {
      setLoading(true);
      // await deleteExpenseAPI(docId);
      // dispatch(deleteExpenseReducer(docId));
      toast.success("Delete successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    useGetTransaction,
    useAddTransaction,
    useUpdateTransaction,
    useDeleteTransaction,
    initLoading,
    loading,
  };
};

export default useTransition;
