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
import { useForm } from "react-hook-form";
import { Textarea } from "@/ui/textarea";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DragAndDrop from "./DragnDrop";
import { cn } from "@/lib/utils";

const productFormSchema = z.object({
  productName: z.string().min(2, {
    message: "Product Name must be at least 2 characters.",
  }),
  productPrice: z.string(),
  productDescription: z.string().optional(),
  productCategory: z.string().min(1, {
    message: "Product Category is required.",
  }),
  images: z.array(z.string().url()), // Array of image URLs
});

export function ProductForm() {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      productPrice: undefined,
      productDescription: "",
      productCategory: "",
      images: undefined,
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
            className="grid grid-cols-5 items-start gap-6 space-y-4"
          >
            <div className="col-span-3 w-full">
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
              {/* product category */}
              <FormField
                control={form.control}
                name="productCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="next">Next.js</SelectItem>
                          <SelectItem value="sveltekit">SvelteKit</SelectItem>
                          <SelectItem value="astro">Astro</SelectItem>
                          <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <DragAndDrop />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
