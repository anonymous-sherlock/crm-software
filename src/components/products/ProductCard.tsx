"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { ProductWithImagesPayload } from "@/types/db";
import Image from "next/image";
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
} from "../ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { DeleteProductPayload } from "@/schema/productSchema";
import { ToastAction } from "../ui/toast";

interface ProductCardProps {
  product: ProductWithImagesPayload;
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0];
  const router = useRouter();

  const { mutate: deleteProduct, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/product/delete/${product.productId}`
      );
      console.log(data);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return toast({
            title: "Product not found.",
            description: "Product may already have been deleted",
            variant: "destructive",
          });
        }
      } else {
        return toast({
          title: "Uh oh! Something went wrong",
          description: "There was a problem with your request",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    onSuccess: (data) => {
      router.refresh();
      return toast({
        title: `${product.name} Product deleted successfully.`,
        description: "",
        variant: "success",
      });
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="capitalize text-xl">
          <div className="flex justify-between">
            <span>{product.name}</span>
            <span className="text-gray-400 text-lg ">
              Rs. {formatPrice(product.price)} /-
            </span>
          </div>
        </CardTitle>
        <CardDescription className="truncate">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-60 h-60 flex relative">
          <Image
            src={firstImage?.url as string}
            fill
            alt={product.name}
            className="absolute inset-0 object-contain"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit Product</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isLoading}>
              {isLoading ? "Deleting product..." : "Delete Product"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                product and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteProduct()}
                disabled={isLoading}
                className={buttonVariants({ variant: "destructive" })}
              >
                {isLoading ? "Deleting product..." : "Delete Product"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
