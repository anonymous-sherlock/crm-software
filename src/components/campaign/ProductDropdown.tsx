"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { ProductSearchPayload } from "@/schema/productSchema";
import { ProductWithImagesPayload } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
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
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";

interface ProductDropdownProps {}

const ProductDropdown: FC<ProductDropdownProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string | null>("");
  const debouncedValue = useDebounce(searchText, 500);
  const {
    data: products,
    isFetching,
    isFetched,
    refetch,
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const { setValue, setError, watch, getValues, register, clearErrors } =
    useFormContext();

  return (
    <section>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild onClick={() => refetch()}>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between",
                !getValues("product") && "text-muted-foreground"
              )}
            >
              {getValues("product")
                ? products?.data.find(
                    (p) => p.productId === getValues("product")
                  )?.name
                : "Select a Product"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-w-[360px]">
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
                          console.log(newProduct); // Log the latest value
                          setOpen(false);
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
        {(selectedProduct &&
          products?.data
            .find((p) => p.productId === selectedProduct)
            ?.images.map((img) => (
              <div
                key={img.id}
                className="relative w-full h-40 mt-4 rounded-md inline-block bg-gray-100 border-gray-300 border-2"
              >
                <Image
                  fill
                  src={encodeURI(img.url)}
                  alt="Selected Product"
                  className="absolute object-contain mr-auto inset-0"
                />
              </div>
            ))) || (
          <div className="relative w-full h-40 mt-4 rounded-md inline-block bg-gray-100 border-gray-300 border-2">
            <Image
              fill
              src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Default Product Image"
              className="absolute object-contain mr-auto inset-0"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDropdown;
