"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// components
import FilterCategory from "@/components/filter/filter-category";
import FilterPrice from "@/components/filter/filter-price";
import FilterRating from "@/components/filter/filter-rating";
import NoData from "./no-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductShowcase } from "@/components/product/product-showcase";
import CommonPagination from "@/components/common/common-pagination";

// utils
import { cn } from "@/lib/utils";
import { hover } from "@/lib/hover";

// assets
import ProductsJSON from "@/assets/json/products.json";
import { useGetAllProductsQuery } from "@/services/product";
import { useRouter, useSearchParams } from "next/navigation";

export default function Products() {
  const isNoData = false;

  // routing
  const router = useRouter();
  const searchParams = useSearchParams();
  const GETPARAMSPAGINATE = searchParams?.get("page");
  const GETPARAMSCATEGORY = searchParams?.get("category");
  const GETPARAMSRATING = searchParams?.get("rating");
  const GETPARAMSMAXPRICE = searchParams?.get("max_price");
  const GETPARAMSMINPRICE = searchParams?.get("min_price");
  const GETPARAMSSORT = searchParams?.get("sort");

  const PARSEPRICEMINTOINTEGER = parseInt(GETPARAMSMINPRICE as string);
  const PARSEPRICEMAXTOINTEGER = parseInt(GETPARAMSMAXPRICE as string);

  console.log("PARSEPRICEMINTOINTEGER", PARSEPRICEMINTOINTEGER);

  const { data: products } = useGetAllProductsQuery({
    page: GETPARAMSPAGINATE || undefined,
    category: GETPARAMSCATEGORY || undefined,
    max_price: GETPARAMSMINPRICE || undefined,
    min_price: GETPARAMSMAXPRICE || undefined,
    ratings: GETPARAMSRATING || undefined,
    sort: GETPARAMSSORT || undefined,
  });
  const InitialStatePagePaginate = GETPARAMSPAGINATE
    ? parseInt(GETPARAMSPAGINATE as string)
    : 1;
  const [activePage, setActivePage] = useState(InitialStatePagePaginate);
  const TOTALRECORDSPAGINATE = products?.data.totalRecords;

  const handleChangeFilter = (key: string, value: string) => {
    const newQuery: Record<string, string> = {};

    searchParams.forEach((param: string, key: string) => {
      newQuery[key] = param;
    });
    newQuery[key] = value;
    const urlParams = new URLSearchParams(newQuery).toString();
    console.log("urlParams", urlParams);
    console.log("newQuery", newQuery);
    router.replace(`/product?${urlParams}`);
  };

  React.useEffect(() => {
    handleChangeFilter("page", activePage.toString());
  }, [activePage]);

  console.log("data-product", GETPARAMSCATEGORY?.split(","));

  return (
    <main className="flex flex-col w-full min-h-screen items-center pb-8">
      <div className="w-content flex pt-5 gap-6">
        <div className="flex-[1] border border-gray-300 rounded-xl py-6 px-4 h-fit">
          <div className="text-2xl font-semibold">Filter</div>
          <div className="w-full separator my-4" />
          <FilterCategory
            value={GETPARAMSCATEGORY?.split(",")}
            onChange={(selectedCategory) =>
              handleChangeFilter("category", selectedCategory.join(","))
            }
          />
          <div className="w-full separator my-4" />
          <FilterPrice
            value={{
              min_price: GETPARAMSMINPRICE!!,
              max_price: GETPARAMSMAXPRICE!!,
              // min_price: GETPARAMSMINPRICE ? PARSEPRICEMINTOINTEGER : undefined,
              // max_price: GETPARAMSMAXPRICE ? PARSEPRICEMAXTOINTEGER : undefined,
            }}
            onChange={(price) => {
              // console.log("price", price);
              // console.log(
              //   "price.min_price !== PARSEPRICEMINTOINTEGER",
              //   price.min_price !== PARSEPRICEMINTOINTEGER
              // );
              if (price && price.min_price !== GETPARAMSMINPRICE) {
                handleChangeFilter("min_price", `${price.min_price}`);
              } else {
                handleChangeFilter("max_price", `${price.max_price}`);
              }
            }}
          />
          <div className="w-full separator my-4" />
          <FilterRating
            value={GETPARAMSRATING ? GETPARAMSRATING.split(",") : []}
            onChange={(selectedRating) =>
              handleChangeFilter("rating", selectedRating.join(","))
            }
          />
        </div>

        <div className="flex-[3]">
          {isNoData ? (
            <NoData />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="text-leaf text-3xl font-semibold">
                  Daftar Produk
                </div>
                <div className="flex items-center gap-2">
                  <div>Urut Berdasarkan</div>
                  <Select
                    onValueChange={(value: "lowest" | "highest") =>
                      handleChangeFilter("sort", value)
                    }
                    defaultValue={"lowest"}
                  >
                    <SelectTrigger
                      className={cn("w-[234px] bg-white", hover.shadow)}
                    >
                      <SelectValue placeholder="Urut Berdasarkan" />
                    </SelectTrigger>
                    <SelectContent className="w-[234px]">
                      <SelectGroup>
                        <SelectItem value="lowest">Harga Terendah</SelectItem>
                        <SelectItem value="highest">Harga Tertinggi</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <ProductShowcase
                gridConfig={"grid-cols-3"}
                products={products?.data ? products.data.records : []}
              />

              <div className="py-12">
                <CommonPagination
                  page={activePage}
                  total={
                    TOTALRECORDSPAGINATE
                      ? Math.ceil(TOTALRECORDSPAGINATE / 9)
                      : 1
                  }
                  onChange={(activePage) => setActivePage(activePage)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-content separator my-6 mb-8" />

      <div className="w-content">
        <div className="flex justify-between mb-6 items-center">
          <div className="text-leaf text-3xl font-semibold">
            Kamu mungkin sukai
          </div>
          <Link
            href={"/product"}
            className="text-base p-0 h-auto bg-white text-neutral-600"
          >
            Lihat Selengkapnya {">"}
          </Link>
        </div>
        <ProductShowcase
          gridConfig={"grid-cols-4"}
          products={products?.data ? products.data.records : []}
        />
      </div>
    </main>
  );
}
