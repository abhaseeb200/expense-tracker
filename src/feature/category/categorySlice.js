import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: { categoryData: [] },
  reducers: {
    getCategory: (state, action) => {
      return {
        ...state,
        categoryData: [...action.payload],
      };
    },
    addCategory: (state, action) => {
      return {
        ...state,
        categoryData: [...state.categoryData, action.payload],
      };
    },
    editCategory: (state, action) => {
      let currentIndex = state.categoryData.findIndex(
        (item) => item.docID == action.payload.docID
      );

      if (currentIndex !== -1) {
        state.categoryData[currentIndex] = action.payload;
      }
      return state;
    },
    deleteCategory: (state, action) => {
      return {
        ...state,
        categoryData: state.categoryData.filter(
          (item) => item.docID != action.payload
        ),
      };
    },
    clearCategory: (state) => {
      return {
        ...state,
        categoryData: [],
      };
    },
  },
});

export const {
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  clearCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
