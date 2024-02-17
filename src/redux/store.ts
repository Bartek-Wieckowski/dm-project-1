import { configureStore } from '@reduxjs/toolkit';
import moneyReducer from './money/moneySlice';
import orderReducer from './order/orderSlice';

const store = configureStore({
  reducer: {
    money: moneyReducer,
    order: orderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
