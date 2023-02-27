import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Spinner } from "components/Spinner";
import { ProductItem, Product } from "components/ProductItem";
import { Error } from "components/Error";
import { fetchProducts, selectProducts } from "./productsSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

export type Products = Product[];

export const ProductsList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsStatus = useAppSelector((state) => state.products.status);
  const isLoading = productsStatus === "loading";
  const isError = productsStatus === "error";

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  if (isLoading) return <Spinner />;
  if (isError) {
    return <Error message={"Something happend while loading Products"} />;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
    >
      {products.map((product) => {
        return (
          <Grid key={product.id} item xs={4} sm={4} md={4} lg={4} xl={4}>
            <ProductItem product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};
