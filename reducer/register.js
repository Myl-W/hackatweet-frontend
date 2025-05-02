import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueFirstname: [],
  valueUsername: [],
  valuePassword: [],
};

export const register = createSlice({
  name: "register",

  initialState,
  reducers: {
    userFirstname: (state, action) => {
      state.valueFirstname = action.payload;
    },
    userUsername: (state, action) => {
      state.valueUsername = action.payload;
    },
    userPassword: (state, action) => {
      state.valuePassword = action.payload;
    },
  },
});

export const { userFirstname, userUsername, userPassword } = register.actions;
export default register.reducer;
