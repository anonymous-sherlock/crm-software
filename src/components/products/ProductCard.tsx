import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productWithImages } from "@/types/db";
import Image from "next/image";

export function ProductCard({ product }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={product.images[0]} width={50} height={30} alt="" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit Product</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}
