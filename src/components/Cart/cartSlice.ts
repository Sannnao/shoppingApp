import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import {
  getItemsFromLs,
  setItemToLs,
  removeItemFromLs,
} from "utils/localStorage";
import { Product } from "components/ProductItem";

export type ProductItem = {
  product: Product;
  amount: number;
};

type ProductId = {
  id: number;
};

const productsAdapter = createEntityAdapter<ProductItem>({
  selectId: (state) => state.product.id,
});

const initialState = productsAdapter.getInitialState();

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setProductsFromLs: (state, action) => {
      productsAdapter.setAll(state, action.payload);
    },
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      productsAdapter.setOne(state, action.payload);
    },
    decreaceProductAmount: (state, action: PayloadAction<ProductId>) => {
      const { id } = action.payload;
      const product = state.entities[id];

      if (product) {
        product.amount--;
      }
    },
    removeProduct: (state, action: PayloadAction<ProductId>) => {
      productsAdapter.removeOne(state, action.payload.id);
    },
  },
});

export const {
  setProductsFromLs,
  addProduct,
  decreaceProductAmount,
  removeProduct,
} = cartSlice.actions;

export const loadProductsFromLs = (): AppThunk => (dispatch) => {
  const lsItems = getItemsFromLs();

  if (lsItems) {
    const items = Object.values(lsItems);
    dispatch(setProductsFromLs(items));
  }
};

export const addProductWithLs =
  (product: Product): AppThunk =>
  (dispatch, getState) => {
    const id = product.id;
    const storeProduct = selectCartProductById(getState(), id);

    if (storeProduct) {
      const newAmount = storeProduct.amount + 1;
      const newProduct = { product, amount: newAmount };

      setItemToLs(id, newProduct);

      dispatch(addProduct(newProduct));
    } else {
      const newProduct = { product, amount: 1 };

      setItemToLs(id, newProduct);

      dispatch(addProduct(newProduct));
    }
  };

export const decreaceProductAmountWithLs =
  ({ id }: ProductId): AppThunk =>
  (dispatch, getState) => {
    const storeProduct = selectCartProductById(getState(), id);

    if (storeProduct) {
      if (storeProduct.amount > 1) {
        const newProduct = {
          product: storeProduct.product,
          amount: storeProduct.amount - 1,
        };
        setItemToLs(id, newProduct);
        dispatch(decreaceProductAmount({ id }));
      } else {
        removeItemFromLs(id);
        dispatch(removeProduct({ id }));
      }
    }
  };

export const removeProductWithLs =
  ({ id }: ProductId): AppThunk =>
  (dispatch) => {
    removeItemFromLs(id);
    dispatch(removeProduct({ id }));
  };

export const {
  selectAll: selectCartProducts,
  selectById: selectCartProductById,
} = productsAdapter.getSelectors<RootState>((state) => {
  return state.cart;
});

export default cartSlice.reducer;
