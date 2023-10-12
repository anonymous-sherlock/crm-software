"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/ui/checkbox";

import { cn } from "@/lib/utils";
import {
  LeadStatus
} from "@prisma/client";
import { statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
export type Lead = {
  id: string;
  ip: string;
  name: string;
  phone: string;
  address: string;
  state: string;
  region: string;
  country: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
  leadCampaingId: string;
  userId: string | null;
};

export const columns: ColumnDef<Lead>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Id" />
    ),
    cell: ({ row }) => (
      <div className="w-[75px] truncate">{row.getValue("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const cell = row.original;

      return (
        <div className="flex max-w-[220px] space-x-2 ">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="w-full truncate font-medium ">
            {row.getValue("name")}{" "}
          </span>

        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex max-w-[220px] space-x-2 ">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="w-full truncate font-medium ">
            {row.getValue("phone")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      const cell = row.original;

      return (
        <div className="flex max-w-[180px] items-center ">
          <span className="mr-1 line-clamp-1 whitespace-pre-line leading-7 ">
            {cell.address}
          </span>

        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),

    cell: ({ row }) => {
      const cell = row.original;
      return (
        <div className="flex max-w-[180px] items-center ">
          <span className="mr-1 line-clamp-1 whitespace-pre-line leading-7 ">
            {cell.region}
          </span>

        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "ip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IP" />
    ),
    cell: ({ row }) => {
      const cell = row.original;

      return (
        <div className="flex items-center ">
          <span className="mr-1 line-clamp-1 whitespace-pre-line leading-7 ">
            {cell.ip}
          </span>

        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Uploaded On" />
    ),
    cell: ({ row }) => {
      const cell = row.original;

      return (
        <div className="flex items-center max-w-[180px] ">
          <span className="truncate mr-1 ">
            {moment(cell.createdAt).format("MMM D, YYYY [-] hh:mm A")}
          </span>
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
            status.value === "Trashed" ? "text-red-500" : status.value === "Approved" ? "text-green-600" : ""
          )}
        ><Badge variant={'secondary'} className="rounded-full">
            {status.icon && (
              <status.icon
                className={cn(
                  "mr-2 h-4 w-4 text-muted-foreground font-bold",
                  status.value === "Trashed" ? "text-red-500" : status.value === "Approved" ? "text-green-600" : ""
                )}
              />
            )}
            {status.label}</Badge>
          <span></span>
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
