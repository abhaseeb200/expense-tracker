import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import getDownloadURL from "../config/service/firebase/getDownloadURL";
import {
  addSourceAPI,
  deleteSourceAPI,
  getSourceAPI,
  updateSourceAPI,
} from "../config/service/firebase/source";
import {
  addSourceReducer,
  deleteSourceReducer,
  getSourceReducer,
  updateSourceReducer,
} from "../feature/source-transaction/sourceSlice";

const useSource = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state?.auth?.userData);

  const useGetSource = async () => {
    try {
      setInitLoading(true);
      let source = {};
      let response = await getSourceAPI(userId);
      response.forEach((element) => {
        source[element.id] = {
          ...element.data(),
          docId: element.id,
        };
      });
      dispatch(getSourceReducer(source));
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
      const URL = await getDownloadURL("source", body?.uploadSource);

      //MODIFIED OBJECT
      delete body.uploadSource;

      //ADD TO DATABASE
      let response = await addSourceAPI({ ...body, sourceURL: URL });
      dispatch(
        addSourceReducer({ ...body, sourceURL: URL, docId: response?.id })
      );
      setValues({});
      setPreview("");
      toast.success("Create successfully!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const useUpdateSource = async (body, docId) => {
    try {
      setLoading(true);
      await updateSourceAPI(body, docId);
      dispatch(updateSourceReducer({ ...body, docId: docId }));
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
      await deleteSourceAPI(docId);
      dispatch(deleteSourceReducer(docId));
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
