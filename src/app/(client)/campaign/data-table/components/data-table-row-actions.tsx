"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button, buttonVariants } from "@/ui/button";
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Link from "next/link";

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
              title: "Cannot updated campaign.",
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

  const { mutate: copyCampaign, isLoading: isCopyingCampaign } =
    trpc.campaign.copyCampaign.useMutation({
      onSuccess: (data) => {
        toast({
          title: `${data.copiedCampaign.name} copied succesfully`,
          description: "",
          variant: "success",
        });
        setCampaignStatus(data.copiedCampaign.status)
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 500) {
            return toast({
              title: "Cannot copy campaign.",
              description: "Something Went Wrong",
              variant: "destructive",
            });
          }
        }
      },
      onSettled() {
        utils.campaign.getAll.invalidate();
      },
    });

  const { mutate: deleteCampaign, isLoading: isDeletingCampaign } = trpc.campaign.deleteCampaign.useMutation({
    onSuccess: (data) => {
      toast({
        title: `${data.deletedCount} Campaign Deleted succesfully`,
        description: "",
        variant: "success",
      });
    },
    onSettled() {
      utils.campaign.getAll.invalidate();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          return toast({
            title: "Cannot Delete Campaign.",
            description: "Something Went Wrong",
            variant: "destructive",
          });
        }
      }
    },
  });

  function handleStatusChange(status: CampaignStatus) {
    const payload = campaign;
    updateStatus({
      campaignId: payload.campaignId,
      campaignStatus: status,
    });

    // Update the local state with the new status
    setCampaignStatus(status);
  }
  function handleCopyCampaign() {
    const payload = campaign;
    copyCampaign({
      campaignId: payload.campaignId,
    });
  }
  function handleDeleteCampaign() {
    const currentRow = campaign;
    const payload = currentRow.campaignId;

    deleteCampaign({ campaignIds: [payload] });
  }

  return (
    <>
      {isUpdatingStatus || isCopyingCampaign || isDeletingCampaign ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <AlertDialog>
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
              <DropdownMenuItem onClick={handleCopyCampaign}>Make a copy</DropdownMenuItem>
              <DropdownMenuItem><Link href={`leads/${campaign.campaignCode}`} >View Leads</Link></DropdownMenuItem>
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
                        value={status.value}
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
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-600" disabled={isDeletingCampaign}>
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          {/*Delete Dialog Content */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Campaign from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteCampaign}
                disabled={isDeletingCampaign}
                className={buttonVariants({ variant: "destructive" })}
              >
                {isDeletingCampaign ? "Deleting..." : "Delete Campaign"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
