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
    clearUserProfile: (state) => {
      return {
        ...state,
        userData: {},
        isLogin: false,
      };
    },
  },
});

export const { getUserProfile, editUserProfile, clearUserProfile } =
  userSlice.actions;

export default userSlice.reducer;
