import { createSlice } from "@reduxjs/toolkit";

export const sourceSlice = createSlice({
  name: "source",
  initialState: { sourceData: {} },
  reducers: {
    getSourceReducer: (state, action) => {
      return {
        ...state,
        sourceData: { ...action.payload },
      };
    },
    addSourceReducer: (state, action) => {
      return {
        ...state,
        sourceData: {
          [action.payload.docId]: action.payload,
          ...state.sourceData,
        },
      };
    },
    updateSourceReducer: (state, action) => {
      if (state.sourceData[action.payload.docId]) {
        state.sourceData[action.payload.docId] = action.payload;
      }
      return state;
    },
    deleteSourceReducer: (state, action) => {
      const { [action.payload]: _, ...rest } = state.sourceData;
      return {
        ...state,
        sourceData: rest,
      };
    },
  },
});

export const {
  getSourceReducer,
  addSourceReducer,
  updateSourceReducer,
  deleteSourceReducer,
} = sourceSlice.actions;

export default sourceSlice.reducer;
