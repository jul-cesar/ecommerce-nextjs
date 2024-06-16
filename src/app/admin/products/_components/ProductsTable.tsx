import React from "react";
import { DataTable } from "./data-table";
import prisma from "@/db/db";
import { columns, ProductsTableInterface } from "./columns";

const ProductsTable = async () => {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      priceInCop: true,
      id: true,
      isAvailableToBuy: true,
      description:true,
      createdAt: true,
      updatedAt: true,
      imagePath: true,
      filePath: true,
      _count: { select: { Order: true } },
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const productsTableData = products.map((product) => ({
    id: product.id,
    name: product.name,
    priceInCop: Number(product.priceInCop),
    order: product._count.Order,
    isAvailableToBuy: product.isAvailableToBuy,
    count: product._count.Order,
    description: product.description,
    imagePath: product.imagePath,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    filePath: product.filePath,

  }));

  return (
    <div className="container p-0 sm:px-8 mx-auto py-10">
      <DataTable columns={columns} data={productsTableData} />
    </div>
  );
};

export default ProductsTable;
