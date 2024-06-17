import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: { transactionData: [] },
  reducers: {
    getTransaction: (state, action) => {
      return {
        ...state,
        transactionData: [...action.payload],
      };
    },
    addTransaction: (state, action) => {
      return {
        ...state,
        transactionData: [action.payload,...state.transactionData],
      };
    },
    editTransaction: (state, action) => {
      let currentIndex = state.transactionData.findIndex(
        (item) => item.docID == action.payload.docID
      );

      if (currentIndex !== -1) {
        state.transactionData[currentIndex] = action.payload;
      }
      return state;
    },
    deleteTransaction: (state, action) => {
      return {
        ...state,
        transactionData: state.transactionData.filter(
          (item) => item.docID != action.payload
        ),
      };
    },
    clearTransactions: (state) => {
      return {
        ...state,
        transactionData: [],
      };
    },
  },
});

export const {
  getTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
  clearTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
