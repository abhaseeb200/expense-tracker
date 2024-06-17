import { createSlice } from "@reduxjs/toolkit";

export const budgetSlice = createSlice({
  name: "budget",
  initialState: { budgetData: [] },
  reducers: {
    getBudget: (state, action) => {
      return {
        ...state,
        budgetData: [...action.payload],
      };
    },
    addBudget: (state, action) => {
      return {
        ...state,
        budgetData: [action.payload, ...state.budgetData],
      };
    },
    editBudget: (state, action) => {
      let currentIndex = state.budgetData.findIndex(
        (item) => item.docID == action.payload.docID
      );

      if (currentIndex !== -1) {
        state.budgetData[currentIndex] = action.payload;
      }
      return state;
    },
    deleteBudget: (state, action) => {
      return {
        ...state,
        budgetData: state.budgetData.filter(
          (item) => item.docID != action.payload
        ),
      };
    },
    clearBudget: (state) => {
      return {
        ...state,
        budgetData: [],
      };
    },
  },
});

export const { getBudget, addBudget, editBudget, deleteBudget, clearBudget } =
  budgetSlice.actions;

export default budgetSlice.reducer;
