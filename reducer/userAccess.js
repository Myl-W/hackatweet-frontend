import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueLogin: [],
  valueLogout: [],
};

export const userAccess = createSlice({
  name: "userAccess",

  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.valueLogin = action.payload;
    },
    userLogout: (state, action) => {
      state.valueLogout = action.payload;
    },
  },
});

export const { userLogin, userLogout } = userAccess.actions;
export default userAccess.reducer;
