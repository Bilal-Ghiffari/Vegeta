import IBaseResponse from "@/types/response";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface ProductResponse extends IBaseResponse {
  data: {
    totalRecords: number;
    records: Product[];
  };
}

type ProductApiParams = {
  page?: string | undefined;
  category?: string | undefined;
  max_price?: string | undefined;
  min_price?: string | undefined;
  ratings?: string | undefined;
  sort?: string | undefined;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/product" }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductResponse, ProductApiParams>({
      query: ({ page, category, min_price, max_price, ratings, sort }) => ({
        url: "/",
        params: {
          page: page || undefined,
          category: category || undefined,
          min_price: min_price || undefined,
          max_price: max_price || undefined,
          rating: ratings || undefined,
          sort: sort || undefined,
        },
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
