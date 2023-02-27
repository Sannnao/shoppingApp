import { Products } from "components/ProductsList";

const BASE_URL = "https://fakestoreapi.com";

export const getProducts = async (): Promise<Products> => {
  const rawData = await fetch(`${BASE_URL}/products`);
  return rawData.json();
};
