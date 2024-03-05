import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userinfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      const userInfo = { id: nanoid(), value: action.payload };
      state.userinfo = userInfo.value;
    },
    clearUserInfo(state, action) {
      state.userinfo = { ...initialState.userinfo };
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
