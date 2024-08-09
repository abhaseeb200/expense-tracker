import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import getDownloadURL from "../config/service/firebase/getDownloadURL";

const useSource = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state?.auth?.userData);

  const useGetSource = async () => {
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

  const useAddSource = async (body, setValues, setPreview) => {
    try {
      setLoading(true);
      // CREATE IMAGE URL
      let URL = await getDownloadURL("source", body?.uploadSource);

      //MODIFIED OBJECT
      delete body.uploadSource;

      //ADD TO DATABASE
      let response = await addSourceAPI({ ...body, sourceURL: URL });
      dispatch(addSourceReducer({ ...body , sourceURL: URL, docId: response?.id }));
      setValues({});
      setPreview("");
      toast.success("Create successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const useUpdateSource = async (body, docId) => {
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
  const useDeleteSource = async (docId) => {
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
    useGetSource,
    useAddSource,
    useUpdateSource,
    useDeleteSource,
    initLoading,
    loading,
  };
};

export default useSource;
