import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: { transactionData: [] },
  reducers: {
    getTransactionReducer: (state, action) => {
      return {
        ...state,
        transactionData: [...action.payload],
      };
    },
    addTransactionReducer: (state, action) => {
      return {
        ...state,
        transactionData: [action.payload, ...state.transactionData],
      };
    },
    updateTransactionReducer: (state, action) => {
      let currentIndex = state.transactionData.findIndex(
        (item) => item.docId == action.payload.docId
      );

      if (currentIndex !== -1) {
        state.transactionData[currentIndex] = action.payload;
      }
      return state;
    },
    deleteTransactionReducer: (state, action) => {
      return {
        ...state,
        transactionData: state.transactionData.filter(
          (item) => item.docId != action.payload
        ),
      };
    },
  },
});

export const {
  getTransactionReducer,
  addTransactionReducer,
  updateTransactionReducer,
  deleteTransactionReducer,
} = transactionSlice.actions;

export default transactionSlice.reducer;
