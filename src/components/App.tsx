import { ProductsList } from "components/ProductsList";
import { useAppDispatch } from "app/hooks";
import { loadProductsFromLs } from "components/Cart/cartSlice";
import { useEffect } from "react";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProductsFromLs());
  }, [dispatch]);

  return <ProductsList />;
};
