"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Campaign } from "./columns";

interface DeleteCampaignProps<TData> {
  table: Table<TData>;
}

export function DeleteCampaign<TData>({ table }: DeleteCampaignProps<TData>) {
  const router = useRouter();

  const { mutateAsync: deleteCampaigns, isLoading } = useMutation({
    mutationFn: async (input: string[]) => {
      const payload = {
        campaignIds: input,
      };

      const { data } = await axios.delete("/api/campaign/delete", {
        data: payload,
      });
      console.log(data);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          return toast({
            title: "Cannot Delete Campaign.",
            description: "",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      toast({
        title: `Campaign Deleted succesfully`,
        description: "",
        variant: "success",
      });
      router.refresh();
    },
  });

  function handleCampaignDelete() {
    const rows = table.getFilteredSelectedRowModel().rows;
    const payload = rows.map((row) => {
      const rowOriginal = row.original as Campaign;
      return rowOriginal.campaignId;
    });
    deleteCampaigns(payload);
  }
  return (
    <>
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="h-8 px-2 lg:px-3 mr-2"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Campaign and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCampaignDelete}
                disabled={isLoading}
                className={buttonVariants({ variant: "destructive" })}
              >
                {isLoading ? "Deleting..." : "Delete Campaign"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
