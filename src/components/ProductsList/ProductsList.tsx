import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Spinner } from "components/Spinner";
import { ProductItem, Product } from "components/ProductItem";

type ProductsListProps = {};

type Products = Product[];

export const ProductsList = ({}: ProductsListProps) => {
  const [products, setProducts] = useState<null | Products>(null);
  const isLoading = !products;

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await res.json();
      console.log(data);

      setProducts(data);
    };

    getProducts();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {products.map((product) => {
        return (
          <Grid key={product.id} item xs={2} sm={4} md={4}>
            <ProductItem product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};
