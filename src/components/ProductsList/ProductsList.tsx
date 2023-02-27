import Grid from "@mui/material/Grid";
import { useGetProductsQuery } from "features/api/apiSlice";
import { Error } from "components/Error";
import { Spinner } from "components/Spinner";
import { ProductItem, Product } from "components/ProductItem";

export type Products = Product[];

export const ProductsList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

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
      {products!.map((product) => {
        return (
          <Grid key={product.id} item xs={4} sm={4} md={4} lg={4} xl={4}>
            <ProductItem product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};
