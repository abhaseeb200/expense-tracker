import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: { userData: {}, isLogin: false },
  reducers: {
    getUserProfile: (state, action) => {
      console.log(action, "PLAYLOAD");
      return {
        ...state,
        userData: {
          ...action.payload,
        },
        isLogin: true,
      };
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

export const { getUserProfile, clearUserProfile } = userSlice.actions;

export default userSlice.reducer;
