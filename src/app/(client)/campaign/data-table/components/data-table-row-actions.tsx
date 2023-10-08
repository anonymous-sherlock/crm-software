"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { labels, statuses } from "../data/data";
import { taskSchema } from "../data/schema";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { CampaignStatus } from "@prisma/client";
import React, { useState } from "react";
import Spinner from "@/components/ui/spinner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const utils = trpc.useContext();

  const campaign = taskSchema.parse(row.original);
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>(
    campaign.status
  );
  const { mutate: updateStatus, isLoading: isUpdatingStatus } =
    trpc.campaign.updateStatus.useMutation({
      onSuccess: (data) => {
        toast({
          title: `${data.updatedCampaign.name} status updated succesfully`,
          description: "",
          variant: "success",
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 500) {
            return toast({
              title: "Cannot Delete Product.",
              description: "",
              variant: "destructive",
            });
          }
        }
      },
      onSettled() {
        utils.campaign.getAll.invalidate();
      },
    });

  function handleStatusChange(status: CampaignStatus) {
    console.log(status);
    const payload = campaign;
    updateStatus({
      campaignId: payload.campaignId,
      campaignStatus: status,
    });

    // Update the local state with the new status
    setCampaignStatus(status);
  }

  return (
    <>
      {isUpdatingStatus ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={campaignStatus}
                  onValueChange={(e) => handleStatusChange(e as CampaignStatus)}
                >
                  {statuses.map((status) => (
                    <DropdownMenuRadioItem
                      key={status.value}
                      value={status.value.toString()}
                      className=""
                    >
                      {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      {status.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
