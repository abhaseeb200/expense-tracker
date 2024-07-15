import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: { userData: {}, isLogin: false },
  reducers: {
    getUserProfile: (state, action) => {
      return {
        ...state,
        userData: {
          ...action.payload,
        },
        isLogin: true,
      };
    },
    editUserProfile: (state, action) => {
      state.userData = action?.payload;
    },
    logoutReducer: (state) => {
      return {
        ...state,
      };
    },
  },
});

export const {
  getUserProfile,
  editUserProfile,
  clearUserProfile,
  logoutReducer,
} = userSlice.actions;

export default userSlice.reducer;
