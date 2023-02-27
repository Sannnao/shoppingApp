import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "components/Cart/cartSlice";
import productsSlice from "components/ProductsList/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
