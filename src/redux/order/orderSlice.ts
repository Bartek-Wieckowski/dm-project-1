import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Order = {
  id: string;
  title: string;
};
export type OrderState = {
  orders: Order[];
};
const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      const { id, title } = action.payload;
      state.orders.push({ id, title });
    },
    removeOrder(state, action: PayloadAction<string>) {
      const orderIdToRemove = action.payload;
      state.orders = state.orders.filter(
        (order) => order.id !== orderIdToRemove
      );
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
