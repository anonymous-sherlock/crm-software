"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/ui/checkbox";

import { cn } from "@/lib/utils";
import {
  CampaignStatus,
  Product,
  ProductImage,
  Campaign as CampaignPrisma,
} from "@prisma/client";
import { statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import DescriptionHover from "./description-hover";
import { ProductInfoHover } from "./product-info-hover";
export type Campaign = {
  campaignId: CampaignPrisma["id"];
  campaignCode: CampaignPrisma["code"];
  campaignName: CampaignPrisma["name"];
  description: CampaignPrisma["description"];
  status: CampaignPrisma["status"];
  targetCountry: CampaignPrisma["targetCountry"];
  product: Pick<
    Product & {
      images: ProductImage[];
    },
    | "name"
    | "price"
    | "images"
    | "category"
    | "productId"
    | "description"
    | "createdAt"
  >;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "campaignCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campaign Code" />
    ),
    cell: ({ row }) => (
      <div className="w-[75px]">{row.original.campaignCode}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "campaignName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campaign Name" />
    ),
    cell: ({ row }) => {
      const cell = row.original;

      return (
        <div className="flex max-w-[220px] space-x-2 ">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="w-full truncate font-medium ">
            {row.getValue("campaignName")}{" "}
          </span>
          {cell.description && (
            <DescriptionHover description={cell.description} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "targetCountry",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Country" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex max-w-[220px] space-x-2 ">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="w-full truncate font-medium ">
            {row.getValue("targetCountry")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      const cell = row.original;

      return (
        <div className="flex max-w-[180px] items-center ">
          <span className="mr-1 line-clamp-1 whitespace-pre-line leading-7 ">
            {cell.product.name}
          </span>
          <ProductInfoHover product={cell.product} />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div
          className={cn(
            "flex w-[100px] items-center",
            status.value === "Canceled" && "text-red-500"
          )}
        >
          {status.icon && (
            <status.icon
              className={cn(
                "mr-2 h-4 w-4 text-muted-foreground",
                status.value === "Canceled" && "text-red-500"
              )}
            />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
