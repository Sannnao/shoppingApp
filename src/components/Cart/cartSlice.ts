import { RootState } from "app/store";
import { Product } from "components/ProductItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductItem = {
  product: Product;
  amount: number;
};

type ProductId = {
  id: number;
};

type ProductState = {
  products: ProductItem[];
};

const initialState: ProductState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
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
    removeProduct: (state, action: PayloadAction<ProductId>) => {
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
    removeProducts: (state, action: PayloadAction<ProductId>) => {
      state.products = state.products.filter(
        (product) => product.product.id !== action.payload.id
      );
    },
  },
});

export const { addProduct, removeProduct, removeProducts } = cartSlice.actions;

export const selectCartProducts = (state: RootState) => state.cart.products;
export const selectProductsAmount = (state: RootState) =>
  state.cart.products.reduce((acc, product) => acc + product.amount, 0);
export const selectTotalPrice = (state: RootState) =>
  state.cart.products.reduce(
    (acc, product) => acc + product.product.price * product.amount,
    0
  );

export default cartSlice.reducer;
