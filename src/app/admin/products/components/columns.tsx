"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreHorizontal, LuXCircle } from "react-icons/lu";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export interface ProductsTableInterface {
  id: string;
  name: string;
  priceInCop: number;
  order: number;
  isAvailableToBuy: boolean;
}

export const columns: ColumnDef<ProductsTableInterface>[] = [
  {
    accessorKey: "",
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const product = row.original;
      return product.isAvailableToBuy ? <CheckCircledIcon /> : <LuXCircle />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "priceInCop",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "order",
    header: ({ column }) => (
      <div className="p-4">
        <DataTableColumnHeader column={column} title="Orders" />
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
