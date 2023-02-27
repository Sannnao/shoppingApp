import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Products } from "components/ProductsList";

const BASE_URL = "https://fakestoreapi.com";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<Products, void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;
