"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productCategories } from "@/constants/index";
import { cn } from "@/lib/utils";
import { productFormSchema } from "@/schema/productSchema";
import { useImageFileStore } from "@/store/index";
import { Textarea } from "@/ui/textarea";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "../ui/use-toast";
import DragAndDrop from "./DragnDrop";
import Spinner from "../ui/spinner";

export function ProductForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { files } = useImageFileStore();
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
      productQuantity: "",
      productImages: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof productFormSchema>) {
    const data = values;
    const formData = new FormData();
    function appendIfDefined(key: string, value: any) {
      if (value !== undefined) {
        formData.append(key, value as string);
      }
    }
    appendIfDefined("productName", data.productName);
    appendIfDefined("productPrice", data.productPrice);
    appendIfDefined("productCategory", data.productCategory);
    appendIfDefined("productQuantity", data.productQuantity);
    appendIfDefined("productDescription", data.productDescription);
    files.forEach((image) => {
      formData.append("productImages", image as File);
    });

    axios
      .post("/api/products/add", formData, {})
      .then((response) => {
        toast({
          variant: "success",
          title: "User Created",
          description: response.data.message,
        });
      })
      .catch((err) => console.error(err));
  }

  return (
    <Card className="bg-white p-6">
      <CardTitle>Add a Product</CardTitle>
      <CardContent className="mt-8 w-full p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="grid grid-cols-5 items-start gap-6 space-y-4"
          >
            <div className="col-span-3 flex w-full flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Nutra Bay" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* product price */}
                <FormField
                  control={form.control}
                  name="productPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Price</FormLabel>
                      <FormControl>
                        <Input placeholder="1,999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* product category */}
                <FormField
                  control={form.control}
                  name="productCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? field.value
                                  : "Select a Category"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full p-0"
                            style={{ maxWidth: "100%", width: "100%" }}
                          >
                            <Command className="m-0 h-full w-full p-0">
                              <CommandInput placeholder="Search..." />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Categories">
                                  {productCategories.map((cat, index) => (
                                    <CommandItem
                                      className="my-2  cursor-pointer"
                                      key={index}
                                      value={cat}
                                      onSelect={() => {
                                        form.setValue("productCategory", cat);
                                        form.clearErrors("productCategory");
                                        setOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          cat === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {cat}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* product Quantity */}
                <FormField
                  control={form.control}
                  name="productQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="-1 for unlimited stocks"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* product description */}
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product Description."
                        {...field}
                        className={cn("h-36")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 mt-[0_!important] ">
              {/* <h3 className="mb-4 text-lg capitalize">Add Product Images</h3> */}
              <FormField
                control={form.control}
                name="productImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Product Images</FormLabel>
                    <FormControl>
                      <DragAndDrop />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner /> "Adding Product..."
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
