import { createSlice } from "@reduxjs/toolkit";

export const sourceSlice = createSlice({
  name: "transaction",
  initialState: { sourceData: [] },
  reducers: {
    getSourceReducer: (state, action) => {
      return {
        ...state,
        sourceData: [...action.payload],
      };
    },
    addSourceReducer: (state, action) => {
      return {
        ...state,
        sourceData: [action.payload, ...state.sourceData],
      };
    },
    updateSourceReducer: (state, action) => {
      let currentIndex = state.sourceData.findIndex(
        (item) => item.docId == action.payload.docId
      );

      if (currentIndex !== -1) {
        state.sourceData[currentIndex] = action.payload;
      }
      return state;
    },
    deleteSourceReducer: (state, action) => {
      return {
        ...state,
        sourceData: state.sourceData.filter(
          (item) => item.docId != action.payload
        ),
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
