import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: { categoryData: [] },
  reducers: {
    getCategoryReducer: (state, action) => {
      return {
        ...state,
        categoryData: [...action.payload],
      };
    },
    addCategoryReducer: (state, action) => {
      return {
        ...state,
        categoryData: [action.payload, ...state.categoryData],
      };
    },
    updateCategoryReducer: (state, action) => {
      let currentIndex = state.categoryData.findIndex(
        (item) => item.docID == action.payload.docID
      );

      if (currentIndex !== -1) {
        state.categoryData[currentIndex] = action.payload;
      }
      return state;
    },
    deleteCategoryReducer: (state, action) => {
      return {
        ...state,
        categoryData: state.categoryData.filter(
          (item) => item.docID != action.payload
        ),
      };
    },
    clearCategoryReducer: (state) => {
      return {
        ...state,
        categoryData: [],
      };
    },
  },
});

export const {
  getCategoryReducer,
  addCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
  clearCategoryReducer,
} = categorySlice.actions;

export default categorySlice.reducer;
