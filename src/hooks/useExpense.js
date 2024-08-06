import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addExpenseAPI,
  deleteExpenseAPI,
  getExpenseAPI,
  updateExpenseAPI,
} from "../config/service/firebase/transaction";
import {
  addExpenseReducer,
  deleteExpenseReducer,
  getExpenseReducer,
  updateExpenseReducer,
} from "../feature/expense/expenseSlice";

const useExpense = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state?.auth?.userData);

  const useGetExpense = async () => {
    try {
      setInitLoading(true);
      let transaction = [];
      let response = await getExpenseAPI(userId);
      response.forEach((element) => {
        transaction.push({
          docId: element.id,
          ...element.data(),
          amount: +element.data()?.amount,
        });
      });
      dispatch(getExpenseReducer(transaction));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setInitLoading(false);
    }
  };

  const useAddExpense = async (body, setValues) => {
    try {
      setLoading(true);
      let response = await addExpenseAPI(body);
      dispatch(addExpenseReducer({ ...body, docId: response?.id }));
      setValues({});
      toast.success("Create successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const useUpdateExpense = async (body, docId) => {
    try {
      setLoading(true);
      await updateExpenseAPI(body, docId);
      dispatch(updateExpenseReducer({ ...body, docId: docId }));
      toast.success("Update successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const useDeleteExpense = async (docId) => {
    try {
      setLoading(true);
      await deleteExpenseAPI(docId);
      dispatch(deleteExpenseReducer(docId));
      toast.success("Delete successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    useGetExpense,
    useAddExpense,
    useUpdateExpense,
    useDeleteExpense,
    initLoading,
    loading,
  };
};

export default useExpense;
