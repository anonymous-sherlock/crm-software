import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductWithImagesPayload } from "@/types/db";
import Image from "next/image";

interface ProductCardProps{
  product:ProductWithImagesPayload
}
export function ProductCard({ product  }:ProductCardProps) {
  const firstImage = product.images[0];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="capitalize text-xl">{product.name}</CardTitle>
        <CardDescription className="truncate">{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={firstImage?.url as string} width={250} height={100} alt={product.name} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit Product</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}
