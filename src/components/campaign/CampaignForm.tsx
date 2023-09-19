"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import { cn } from "@/lib/utils";
import {
  CampaignFormPayload,
  campaignFormSchema,
} from "@/schema/campaignSchema";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import ProductDropdown from "./ProductDropdown";

interface CampaignFormProps {}

const CampaignForm: FC<CampaignFormProps> = ({}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      campaignName: "",
      campaignDescription: "",
      product: "",
    },
  });

  const { mutate: createCampaign, isLoading } = useMutation({
    mutationFn: async (input: CampaignFormPayload) => {
      const payload: CampaignFormPayload = {
        campaignName: input.campaignName,
        campaignDescription: input.campaignDescription || "",
        product: input.product,
      };

      const { data } = await axios.post("/api/campaign/create", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Cannot Create Campaign.",
            description: "",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      toast({
        title: `Campaign created`,
        description: "",
        variant: "destructive",
      });
      router.push("/campaign");
    },
  });

  async function onSubmit(values: z.infer<typeof campaignFormSchema>) {
    console.log(values);
  }

  return (
    <Card className="bg-white p-6">
      <CardTitle>Create a Campaign</CardTitle>
      <CardContent className="mt-8 w-full p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="grid grid-cols-5 items-start gap-6 space-y-4"
          >
            <div className="col-span-3 flex w-full flex-col gap-6">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="campaignName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Nutra Bay Campaign" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* product description */}
              <FormField
                control={form.control}
                name="campaignDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Campaign Description."
                        {...field}
                        className={cn("h-36")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 mt-[0_!important]">
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Product</FormLabel>
                    <FormControl>
                      <ProductDropdown />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className={cn("w-full col-span-1")}
            >
              {isLoading ? (
                <>
                  <Spinner /> Creating Campaign...
                </>
              ) : (
                "Create Campaign"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CampaignForm;
