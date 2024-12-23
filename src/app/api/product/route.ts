import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Prisma, ProductCategory } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    // start pagination //
    const take = 9;
    const GETPARAMS = query.get("page");
    const page = GETPARAMS ? parseInt(GETPARAMS as string) - 1 : 0;
    const skip = page * take;
    // end pagination //

    // start categories, price and rating //
    const categories = query.get("category")?.split(",") || undefined;
    const maxPrice = query.get("max_price")
      ? parseInt(query.get("max_price") as string)
      : undefined;
    const minPrice = query.get("min_price")
      ? parseInt(query.get("min_price") as string)
      : undefined;
    const ratings = query.get("rating")?.split(",") || undefined;
    const convertRatings = ratings ? ratings.map((rt) => +rt) : undefined;

    const searchQuery = query.get("k") || undefined;
    console.log("searchQuery", searchQuery);

    const sort = query.get("sort");
    const orderBy: Prisma.ProductOrderByWithRelationInput | undefined =
      sort === "lowest"
        ? { price: "asc" }
        : sort === "highest"
        ? { price: "desc" }
        : undefined;

    const queryCondition = {
      AND: [
        {
          category: {
            in: categories as ProductCategory[],
          },
          price: {
            lte: maxPrice,
            gte: minPrice,
          },
          rating: {
            in: convertRatings,
          },
          name: {
            contains: searchQuery?.toLowerCase(),
            // mode: "insensitive",
          },
        },
      ],
    };

    const totalProduct = await prisma.product.count({
      where: queryCondition,
    });
    const products = await prisma.product.findMany({
      take,
      skip,
      where: queryCondition,
      orderBy,
    });

    console.log("product", products);

    return Response({
      message: "Get all products",
      data: {
        totalRecords: totalProduct,
        records: products,
      },
      status: 200,
    });
  } catch (error: any) {
    return Response({
      message: "Failed to get product",
      data: error,
      status: 500,
    });
  }
}
