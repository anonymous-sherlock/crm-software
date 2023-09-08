"use client"

import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "Product Name",
    header: "name",
  },
  {
    accessorKey: "Product Price",
    header: "Amount",
  },
  {
    accessorKey: "Product Description",
    header: "Amount",
  },
  {
    accessorKey: "Product Description",
    header: "Amount",
  },
]
