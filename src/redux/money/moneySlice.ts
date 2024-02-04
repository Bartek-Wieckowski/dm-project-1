import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialValue: 1,
};

const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {},
});

export default moneySlice.reducer;
