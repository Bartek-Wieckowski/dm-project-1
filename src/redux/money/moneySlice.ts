import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type MoneyState = {
  initialValue: number;
};
const initialState: MoneyState = {
  initialValue: 0,
};

const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {
    withdraw(state, action: PayloadAction<number>) {
      state.initialValue -= action.payload;
    },
    deposit(state, action: PayloadAction<number>) {
      state.initialValue += action.payload;
    },
  },
});

export const { withdraw, deposit } = moneySlice.actions;

export default moneySlice.reducer;
