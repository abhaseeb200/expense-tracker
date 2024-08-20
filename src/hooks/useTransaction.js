import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addTransactionAPI,
  deleteTransactionAPI,
  getTransactionAPI,
  updateTransactionAPI,
} from "../config/service/firebase/transaction";
import {
  addTransactionReducer,
  deleteTransactionReducer,
  getTransactionReducer,
  updateTransactionReducer,
} from "../feature/transaction/transactionSlice";

const useTransaction = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state?.auth?.userData);

  const useGetTransaction = async () => {
    try {
      setInitLoading(true);
      let transaction = [];
      let response = await getTransactionAPI(userId);
      response.forEach((element) => {
        transaction.push({
          docId: element.id,
          ...element.data(),
          amount: +element.data()?.amount,
        });
      });
      dispatch(getTransactionReducer(transaction));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setInitLoading(false);
    }
  };

  const useAddTransaction = async (body, setValues) => {
    try {
      setLoading(true);
      let response = await addTransactionAPI(body);
      dispatch(addTransactionReducer({ ...body, docId: response?.id }));
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
      await updateTransactionAPI(body, docId);
      dispatch(updateTransactionReducer({ ...body, docId: docId }));
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
      await deleteTransactionAPI(docId);
      dispatch(deleteTransactionReducer(docId));
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

export default useTransaction;
