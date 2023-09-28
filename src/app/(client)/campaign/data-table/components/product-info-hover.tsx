import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ProductImage } from "@prisma/client";
import { CalendarIcon, HelpCircle } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type ProductInfoHoverProps = {
  product: Pick<
    {
      productId: string;
      name: string;
      description: string | null;
      price: number;
      images: ProductImage[];
    },
    "name" | "description" | "price" | "productId" | "images"
  >;
};

export const ProductInfoHover: FC<ProductInfoHoverProps> = ({ product }) => {
  const firstProductImage = product.images[0];
  return (
    <HoverCard closeDelay={200} openDelay={300}>
      <HoverCardTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full p-1 h-6 w-6"
        >
          <HelpCircle size={14} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="bottom">
        <div className="flex justify-start space-x-4">
          <Image
            src={encodeURI(firstProductImage?.url as string)}
            alt={product.name}
            width={150}
            height={150}
            className="object-contain w-28 h-28"
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{product.name}</h4>
            <p className="text-sm">{product.description}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
