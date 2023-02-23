import { RootState } from "app/store";
import { Product } from "components/ProductItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductItem = {
  product: Product;
  amount: number;
};

type ProductState = ProductItem[];

const initialState: ProductState = [];

export const cardSlice = createSlice({
  name: "cardSlice",
  initialState: {
    products: initialState,
  },
  reducers: {
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = cardSlice.actions;

export const selectProducts = (state: RootState) => state.card.products;
export const selectProductsAmount = (state: RootState) =>
  state.card.products.reduce((acc, product) => acc + product.amount, 0);

export default cardSlice.reducer;
