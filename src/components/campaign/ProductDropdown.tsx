"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { ProductSearchPayload } from "@/schema/productSchema";
import { ProductWithImagesPayload } from "@/types/db";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Check } from "lucide-react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ProductDropdownProps {
  formSubmitted: boolean;
}

const ProductDropdown: FC<ProductDropdownProps> = ({ formSubmitted }) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string | null>("");
  const debouncedValue = useDebounce(searchText, 500);
  const {
    data: products,
    isFetching,
    isFetched,
    refetch,
    remove,
  } = useQuery<{ data: ProductWithImagesPayload[] }>({
    queryKey: ["product", debouncedValue],
    queryFn: async () => {
      const payload: ProductSearchPayload = {
        name: debouncedValue as string,
        selectedId: selectedProduct as string,
      };
      const { data } = await axios.get("/api/search/product", {
        params: payload,
      });
      return data;
    },
    onError: (err) => {},
    onSuccess: (data) => {
      // console.log(data);
    },
    enabled: !!debouncedValue,
  });

  const { setValue, setError, watch, getValues, register, clearErrors } =
    useFormContext();

  const [open, setOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupTrigger = () => {
    refetch();
    setIsPopupOpen(true);
  };

  useEffect(() => {
    refetch();
    if (formSubmitted === true) {
      setSelectedProduct(null);
      setValue("product", "");
    }

    return () => {
      remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSubmitted]);

  return (
    <section>
      {/* product dropdown */}

      <Popover open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <PopoverTrigger asChild onClick={handlePopupTrigger}>
          <div className="mb-4 mt-2 flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
            <p className="text-sm font-medium leading-none flex justify-start items-center">
              <span className="mr-2 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground flex-grow flex-shrink-0">
                {getValues("product")
                  ? products?.data.find(
                      (p) => p.productId === getValues("product")
                    )?.category?.length
                    ? products?.data.find(
                        (p) => p.productId === getValues("product")
                      )?.category
                    : "no category"
                  : "category"}
              </span>
              <span className="text-muted-foreground line-clamp-1 leading-7 whitespace-pre-line">
                {getValues("product")
                  ? products?.data.find(
                      (p) => p.productId === getValues("product")
                    )?.name
                  : "Select a Product"}
              </span>
            </p>

            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <DotsHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => {
                      setSelectedProduct(null);
                      setValue("product", "");
                      setSearchText("");
                    }}
                  >
                    Remove
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-w-[360px] min-w-[340px]">
          <Command className="m-0 h-full w-full p-0">
            <CommandInput
              placeholder="Search..."
              value={searchText ? searchText : ""}
              onValueChange={(e) => setSearchText(e)}
            />
            <CommandList>
              <CommandEmpty>
                {isFetching ? "Fetching Products..." : "No results found."}
              </CommandEmpty>
              <CommandGroup heading="Products">
                {isFetched &&
                  products &&
                  products?.data
                    ?.sort(
                      (
                        a: ProductWithImagesPayload,
                        b: ProductWithImagesPayload
                      ) => {
                        if (a.productId === getValues("product")) {
                          return -1; // Move a to the beginning
                        } else if (b.productId === getValues("product")) {
                          return 1; // Move b to the beginning
                        }
                        return 0; // No change in order
                      }
                    )
                    .map((product: ProductWithImagesPayload) => (
                      <CommandItem
                        key={product.productId}
                        onSelect={(currentValue) => {
                          const currentProduct = getValues("product");
                          const newProduct =
                            product === currentProduct ? "" : product.productId;
                          setValue("product", newProduct);
                          setSelectedProduct(product.productId);
                          setIsPopupOpen(false);
                        }}
                        value={product.name}
                        className={cn("flex gap-2 cursor-pointer my-1")}
                      >
                        <div className="h-4 w-4">
                          <Check
                            className={cn(
                              "w-full h-full font-semibold",
                              product.productId === getValues("product")
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </div>
                        <div className="w-full w-max-[140px] truncate">
                          <div className="ml-3 flex flex-col w-[calc(100%-10px)]">
                            <span className="text-sm font-medium text-gray-900">
                              {product.name}
                            </span>
                            <span className="text-sm truncate w-[calc(100%-30px)]">
                              {product.description}
                            </span>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-2 gap-4">
        {selectedProduct &&
          products?.data
            .find((p) => p.productId === selectedProduct)
            ?.images.slice(0, 2)
            .map((img) => (
              <div
                key={img.id}
                className="relative w-full h-40 mt-4 rounded-md inline-block bg-gray-100 border-gray-300 border-2"
              >
                <Image
                  fill
                  src={encodeURI(img.url)}
                  alt="Selected Product"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 10vw"
                  className="absolute object-contain mr-auto inset-0"
                />
              </div>
            ))}
      </div>
    </section>
  );
};

export default ProductDropdown;
