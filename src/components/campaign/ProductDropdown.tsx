"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { ProductSearchPayload } from "@/schema/productSchema";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronsUpDown } from "lucide-react";
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
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ProductWithImagesPayload } from "@/types/db";
interface ProductDropdownProps {}

const ProductDropdown: FC<ProductDropdownProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string | null>("");
  const debouncedValue = useDebounce(searchText, 500);

  const {
    data: products,
    isFetching,
    refetch,
  } = useQuery<{ data: ProductWithImagesPayload[] }>({
    queryKey: ["product"],
    queryFn: async () => {
      const payload: ProductSearchPayload = {
        name: debouncedValue as string,
      };
      const { data } = await axios.get("/api/search/product", {
        params: payload,
      });
      return data;
    },
    onError: (err) => {},
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    refetch();
  }, [debouncedValue, refetch]);

  const { setValue, setError, watch, getValues, register, clearErrors } =
    useFormContext();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
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
            {getValues("product") ? getValues("product") : "Select a Product"}
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
              {products?.data?.map((product: ProductWithImagesPayload) => (
                <CommandItem
                  key={product.productId}
                  onClick={() => {
                    setValue("product", product);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProductDropdown;
