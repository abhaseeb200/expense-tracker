import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: { expenseData: [] },
  reducers: {
    getExpenseReducer: (state, action) => {
      return {
        ...state,
        expenseData: [...action.payload],
      };
    },
    addExpenseReducer: (state, action) => {
      return {
        ...state,
        expenseData: [action.payload, ...state.expenseData],
      };
    },
    updateExpenseReducer: (state, action) => {
      let currentIndex = state.expenseData.findIndex(
        (item) => item.docId == action.payload.docId
      );

      if (currentIndex !== -1) {
        state.expenseData[currentIndex] = action.payload;
      }
      return state;
    },
    deleteExpenseReducer: (state, action) => {
      return {
        ...state,
        expenseData: state.expenseData.filter(
          (item) => item.docId != action.payload
        ),
      };
    },
  },
});

export const {
  getExpenseReducer,
  addExpenseReducer,
  updateExpenseReducer,
  deleteExpenseReducer,
  clearTransactionsReducer,
} = expenseSlice.actions;

export default expenseSlice.reducer;
