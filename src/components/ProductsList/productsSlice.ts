import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "api";
import { RootState } from "app/store";
import { Product } from "components/ProductItem";

type ProductsState = {
  products: Product[];
  status: "idle" | "loading" | "fulfield" | "error";
};

const initialState: ProductsState = {
  products: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await getProducts();
    return res;
  }
);

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "fulfield";

        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const {} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
