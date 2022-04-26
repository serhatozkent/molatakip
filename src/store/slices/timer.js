import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saat: null,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setSaat: (state, action) => {
      state.saat = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSaat } = timerSlice.actions;

export default timerSlice.reducer;
