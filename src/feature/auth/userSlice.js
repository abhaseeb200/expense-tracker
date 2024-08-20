import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: { userData: {}, isLogin: false },
  reducers: {
    getUserReducer: (state, action) => {
      return {
        ...state,
        userData: {
          ...action.payload,
        },
        isLogin: true,
      };
    },
    editUserReducer: (state, action) => {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    },
    logoutReducer: (state) => {
      return {
        ...state,
      };
    },
  },
});

export const { getUserReducer, editUserReducer, logoutReducer } =
  userSlice.actions;

export default userSlice.reducer;
