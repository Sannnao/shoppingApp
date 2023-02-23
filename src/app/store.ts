import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cardReducer from "components/Card/cardSlice";

export const store = configureStore({
  reducer: {
    card: cardReducer,
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
