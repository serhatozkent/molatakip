import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = accountSlice.actions;

export default accountSlice.reducer;
