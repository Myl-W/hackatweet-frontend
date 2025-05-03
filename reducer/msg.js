import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueMsg: [],
  valueCount: [],
};

export const userMsg = createSlice({
  name: "userMsg",

  initialState,
  reducers: {
    userMessage: (state, action) => {
      state.valueMsg = action.payload;
    },
    userCount: (state, action) => {
      state.valueCount = action.payload.length;
    },
  },
});

export const { userMessage, userCount } = userMsg.actions;
export default userMsg.reducer;
