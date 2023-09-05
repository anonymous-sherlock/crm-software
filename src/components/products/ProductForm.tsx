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
import { Textarea } from "@/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DragAndDrop from "./DragnDrop";

export function ProductForm() {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
      productImages: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof productFormSchema>) {
    console.log(values);
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

              {/* product category */}
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <Command className="m-0 h-full w-full p-0">
                            <CommandInput placeholder="Search..." />
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup heading="Categories">
                                {productCategories.map((cat, index) => (
                                  <CommandItem
                                    className="my-2 p-0"
                                    key={index}
                                    value={cat}
                                    onSelect={() => {
                                      form.setValue("productCategory", cat);
                                    }}
                                  >
                                    <SelectItem
                                      value={cat}
                                      className="cursor-pointer"
                                    >
                                      {cat}
                                    </SelectItem>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      <DragAndDrop {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
