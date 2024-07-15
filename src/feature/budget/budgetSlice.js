import { createSlice } from "@reduxjs/toolkit";

export const budgetSlice = createSlice({
  name: "budget",
  initialState: { budgetData: [] },
  reducers: {
    getBudgetReducer: (state, action) => {
      return {
        ...state,
        budgetData: [...action.payload],
      };
    },
    addBudgetReducer: (state, action) => {
      return {
        ...state,
        budgetData: [action.payload, ...state.budgetData],
      };
    },
    editBudgetReducer: (state, action) => {
      let currentIndex = state.budgetData.findIndex(
        (item) => item.docId == action.payload.docId
      );

      if (currentIndex !== -1) {
        state.budgetData[currentIndex] = action.payload;
      }
      return state;
    },
    deleteBudgetReducer: (state, action) => {
      return {
        ...state,
        budgetData: state.budgetData.filter(
          (item) => item.docId != action.payload
        ),
      };
    },
  },
});

export const {
  getBudgetReducer,
  addBudgetReducer,
  editBudgetReducer,
  deleteBudgetReducer,
  clearBudget,
} = budgetSlice.actions;

export default budgetSlice.reducer;
