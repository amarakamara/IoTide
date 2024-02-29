import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userid: " ",
  token: " ",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateID: (state, action) => {
      const id = { id: nanoid(), value: action.payload };
      state.userid = id.value;
    },
    clearID: (state, action) => {
      state.userid = " ";
    },
    updateToken: (state, action) => {
      const userToken = { id: nanoid(), value: action.payload };
      state.token = userToken.value;
    },
    clearToken: (state, action) => {
      state.token = " ";
    },
  },
});

export const { updateID, clearID, updateToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
