import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueUsername: [],
  valuePassword: [],
};

export const userLogins = createSlice({
  name: "userLogins",

  initialState,
  reducers: {
    userUsername: (state, action) => {
      state.valueUsername = action.payload;
    },
    userPassword: (state, action) => {
      state.valuePassword = action.payload;
    },
  },
});

export const { userUsername, userPassword } = userLogins.actions;
export default userLogins.reducer;
