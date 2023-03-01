import { useEffect } from "react";
import { useAppDispatch } from "app/hooks";
import { ProductsList } from "features/ProductsList";
import { loadProductsFromLs } from "features/Cart/cartSlice";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProductsFromLs());
  }, [dispatch]);

  return <ProductsList />;
};
