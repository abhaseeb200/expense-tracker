import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addBudgetReducer,
  deleteBudgetReducer,
  editBudgetReducer,
  getBudgetReducer,
} from "../feature/budget/budgetSlice";
import {
  addBudgetAPI,
  deleteBudgetAPI,
  getBudgetAPI,
  updateBudgetAPI,
} from "../config/service/firebase/budget";

const useBudget = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();

  const useGetBudget = async () => {
    try {
      setInitLoading(true);
      let budgets = [];
      let response = await getBudgetAPI(userId);
      response.forEach((element) => {
        budgets.push({
          docId: element.id,
          ...element.data(),
        });
      });
      dispatch(getBudgetReducer(budgets));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setInitLoading(false);
    }
  };

  const useAddBudget = async (body) => {
    try {
      setLoading(true);
      let response = await addBudgetAPI(body, userId);
      dispatch(addBudgetReducer({ ...body, docId: response?.id }));
      toast.success("Create successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const useUpdateBudget = async (body, docId) => {
    try {
      setLoading(true);
      await updateBudgetAPI(body, docId);
      dispatch(editBudgetReducer({ ...body, docId: docId }));
      toast.success("Update successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const useDeleteBudget = async (docId) => {
    try {
      setLoading(true);
      await deleteBudgetAPI(docId);
      dispatch(deleteBudgetReducer(docId));
      toast.success("Delete successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    useGetBudget,
    useAddBudget,
    useUpdateBudget,
    useDeleteBudget,
    initLoading,
    loading,
  };
};

export default useBudget;
