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
import { ProductList } from "./columns";
import { trpc } from "@/app/_trpc/client";

interface DeleteProductProps<TData> {
  table: Table<TData>;
}

export function DeleteProduct<TData>({ table }: DeleteProductProps<TData>) {
  const router = useRouter();
  const { mutate: deleteProducts, isLoading } = trpc.deleteProduct.useMutation({
    onSuccess: (data) => {
      data.deletedCount;
      toast({
        title: `${data.deletedCount} Product Deleted succesfully`,
        description: "",
        variant: "success",
      });
      router.refresh();
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
  });

  function handleCampaignDelete() {
    const rows = table.getFilteredSelectedRowModel().rows;
    const payload = rows.map((row) => {
      const rowOriginal = row.original as ProductList;
      return rowOriginal.productId;
    });
    console.log([...payload]);

    deleteProducts({ productIds: [...payload] });
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
                Products and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCampaignDelete}
                disabled={isLoading}
                className={buttonVariants({ variant: "destructive" })}
              >
                {isLoading ? "Deleting..." : "Delete Products"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
