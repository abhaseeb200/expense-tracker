import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCategoryAPI,
  deleteCategoryAPI,
  getCategoryAPI,
  updateCategoryAPI,
} from "../config/service/firebase/category";
import {
  addCategoryReducer,
  deleteCategoryReducer,
  getCategoryReducer,
  updateCategoryReducer,
} from "../feature/category/categorySlice";

const useCategory = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();

  const useGetCategory = async () => {
    try {
      setInitLoading(true);
      let category = {};
      let response = await getCategoryAPI(userId);
      response.forEach((element) => {
        category[element.id] = {
          ...element.data(),
          docId: element.id,
        };
      });
      dispatch(getCategoryReducer(category));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setInitLoading(false);
    }
  };

  const useAddCategory = async (body) => {
    try {
      setLoading(true);
      let response = await addCategoryAPI(body);
      dispatch(addCategoryReducer({ ...body, docId: response?.id }));
      toast.success("Create successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const useUpdateCategory = async (body, docId) => {
    try {
      setLoading(true);
      await updateCategoryAPI(body, docId);
      dispatch(updateCategoryReducer({ ...body, docId: docId }));
      toast.success("Update successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const useDeleteCategory = async (docId) => {
    try {
      setLoading(true);
      await deleteCategoryAPI(docId);
      dispatch(deleteCategoryReducer(docId));
      toast.success("Delete successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    useGetCategory,
    useAddCategory,
    useUpdateCategory,
    useDeleteCategory,
    initLoading,
    loading,
  };
};

export default useCategory;
