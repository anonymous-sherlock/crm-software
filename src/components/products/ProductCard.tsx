import { Button } from "@/components/ui/button";
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

interface ProductCardProps {
  product: ProductWithImagesPayload;
}
export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="capitalize text-xl">
          <div className="flex justify-between">
            <span>{product.name}</span>
            <span className="text-gray-400 text-lg ">Rs. {formatPrice(product.price)} /-</span>
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
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}
