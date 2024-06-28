import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "themeMode",
  initialState: { isDarkMode: false },
  reducers: {
    isDark: (state, action) => {
      return {
        isDarkMode: action.payload,
      };
    },
  },
});

export const { isDark } = themeSlice.actions;

export default themeSlice.reducer;
