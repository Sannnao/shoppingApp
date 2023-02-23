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
    addProduct: (state, action: PayloadAction<Product>) => {
      const item = state.products.find(
        (product) => product.product.id === action.payload.id
      );

      if (item) {
        item.amount++;
      } else {
        state.products.push({ product: action.payload, amount: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<{ id: number }>) => {
      const product = state.products.find(
        (product) => product.product.id === action.payload.id
      );

      if (product) {
        if (product.amount === 1) {
          state.products = state.products.filter(
            (product) => product.product.id !== action.payload.id
          );
        } else {
          product.amount--;
        }
      }
    },
  },
});

export const { addProduct, removeProduct } = cardSlice.actions;

export const selectProducts = (state: RootState) => state.card.products;
export const selectProductsAmount = (state: RootState) =>
  state.card.products.reduce((acc, product) => acc + product.amount, 0);

export default cardSlice.reducer;
