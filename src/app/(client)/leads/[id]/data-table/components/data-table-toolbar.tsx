"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { trpc } from "@/app/_trpc/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RefreshCw } from "lucide-react";
import { statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DeleteLead } from "./delete-lead";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;


  const utils = trpc.useContext()
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Leads..."
          value={
            (table.getColumn("name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild >
              <Button variant="outline" size="sm" className="h-8 w-8 p-2 border-dashed" onClick={() => { utils.lead.getCampaignLeads.invalidate() }} >
                <RefreshCw color="#000" /></Button>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-500" aria-disabled={true} aria-readonly={true}>
              <p>Refetch Data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DeleteLead table={table} />
      <DataTableViewOptions table={table} />
    </div >
  );
}
