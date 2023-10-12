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

import { trpc } from "@/app/_trpc/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Spinner from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { LeadStatus } from "@prisma/client";
import { AxiosError } from "axios";
import { useState } from "react";
import { statuses } from "../data/data";
import { LeadsSchema } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const utils = trpc.useContext();

  const lead = LeadsSchema.parse(row.original);
  const [leadStatus, setLeadStatus] = useState<LeadStatus>(
    lead.status
  );
  const { mutate: updateStatus, isLoading: isUpdatingStatus } =
    trpc.lead.updateStatus.useMutation({
      onSuccess: (data) => {
        toast({
          title: `${data.updatedLead.id} status updated succesfully`,
          description: "",
          variant: "success",
        });
        setLeadStatus(data.updatedLead.status)
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
        utils.lead.getAll.invalidate();
      },
    });
  const { mutate: deleteLead, isLoading: isDeletingLead } = trpc.lead.deleteLead.useMutation({
    onSuccess: (data) => {
      toast({
        title: `${data.deletedCount} Lead Deleted succesfully`,
        description: "",
        variant: "success",
      });
     
    },
    onSettled() {
      utils.lead.getAll.invalidate();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          return toast({
            title: "Cannot Delete Lead.",
            description: "Something Went Wrong",
            variant: "destructive",
          });
        }
      }
    },
  });


  function handleStatusChange(status: LeadStatus) {
    const payload = lead;
    updateStatus({
      leadId: payload.id,
      leadStatus: status,
    });

    // Update the local state with the new status
    setLeadStatus(status);
  }

  function handleDeleteLead() {
    const currentRow = lead;
    const payload = currentRow.id;

    deleteLead({ leadIds: [payload] });
  }


  return (
    <>
      {isUpdatingStatus || isDeletingLead ? (
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
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={leadStatus}
                    onValueChange={(e) => handleStatusChange(e as LeadStatus)}
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
                <DropdownMenuItem className="text-red-600" disabled={isDeletingLead}>
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
                This action cannot be undone. This will permanently delete this
                lead from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteLead}
                disabled={isDeletingLead}
                className={buttonVariants({ variant: "destructive" })}
              >
                {isDeletingLead ? "Deleting..." : "Delete Lead"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
