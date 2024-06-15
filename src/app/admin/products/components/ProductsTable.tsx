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

      _count: { select: { Order: true } },
    },
  });

  const productsTableData = products.map((product) => ({
    id: product.id,
    name: product.name,
    priceInCop: Number(product.priceInCop),
    order: product._count.Order,
    isAvailableToBuy: product.isAvailableToBuy,
  }));

  return (
    <div className="container p-0 sm:px-8 mx-auto py-10">
      <DataTable columns={columns} data={productsTableData} />
    </div>
  );
};

export default ProductsTable;
