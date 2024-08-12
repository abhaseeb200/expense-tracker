import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: { categoryData: {} },
  reducers: {
    getCategoryReducer: (state, action) => {
      return {
        ...state,
        categoryData: { ...action.payload },
      };
    },
    addCategoryReducer: (state, action) => {
      return {
        ...state,
        categoryData: {
          [action.payload.docId]: action.payload,
          ...state.categoryData,
        },
      };
    },
    updateCategoryReducer: (state, action) => {
      if (state.categoryData[action.payload.docId]) {
        state.categoryData[action.payload.docId] = action.payload;
      }
      return state;
    },
    deleteCategoryReducer: (state, action) => {
      const { [action.payload]: _, ...rest } = state.categoryData;
      return {
        ...state,
        categoryData: rest,
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
