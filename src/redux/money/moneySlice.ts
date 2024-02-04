import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialValue: 0,
};

const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {
    withdraw(state, action) {
      state.initialValue -= action.payload;
    },
    deposit(state, action) {
      state.initialValue += action.payload;
    },
  },
});

export const { withdraw, deposit } = moneySlice.actions;

export default moneySlice.reducer;
