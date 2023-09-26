"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
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
  TrafficSourceDefault,
  campaignFormSchema,
} from "@/schema/campaignSchema";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import ProductDropdown from "./ProductDropdown";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { allCountries } from "country-region-data";
import CountryRegion from "./CountryRegion";
import WorkingHours from "./WorkingHours";
import AgeFields from "./AgeFields";
interface CampaignFormProps {}

const CampaignForm: FC<CampaignFormProps> = ({}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      campaignName: "",
      campaignDescription: "",
      trafficSource: TrafficSourceDefault.Social,
      targetCountry: "",
      product: "",
      leadsRequirements: "",
      callCenterTeamSize: "",
      workingDays: {
        start: "",
        end: "",
      },
      workingHours: {
        startTime: "",
        endTime: "",
      },
      targetAge: {
        min: "",
        max: "",
      },
      targetRegion: [],
    },
  });

  const { mutateAsync: createCampaign, isLoading } = useMutation({
    mutationFn: async (input: CampaignFormPayload) => {
      const payload: CampaignFormPayload = {
        ...input,
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/campaign/create",
        payload
      );
      console.log(data);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
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
        title: `Campaign created succesfully`,
        description: "",
        variant: "success",
      });
      // router.push("/campaign");
    },
  });

  async function onSubmit(values: z.infer<typeof campaignFormSchema>) {
    console.log(values);
    createCampaign(values);
  }

  return (
    <Card className="bg-white p-6">
      <CardTitle>Create a Campaign</CardTitle>
      <CardContent className="mt-8 w-full p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="grid grid-cols-5 items-start gap-8 space-y-4"
          >
            <div className="col-span-3 flex w-full flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
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

                {/* Daily leads Requirements */}
                <FormField
                  control={form.control}
                  name="leadsRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Leads Requirements</FormLabel>
                      <FormControl>
                        <Input placeholder="250" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Call Center Team Size */}
                <FormField
                  control={form.control}
                  name="callCenterTeamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Call Center Team Size</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="65"
                          {...field}
                          {...form.register("callCenterTeamSize")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* traffic source */}
                <FormField
                  control={form.control}
                  name="trafficSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Traffic Source</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Traffic Source" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select a Traffic Source</SelectLabel>
                            <Separator className="my-2" />
                            {Object.entries(TrafficSourceDefault).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* target country  */}
                <CountryRegion />

                {/* target gender */}
                <FormField
                  control={form.control}
                  name="targetGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="capitalize">
                          <SelectTrigger className="w-full capitalize">
                            <SelectValue
                              placeholder="Select a target Gender"
                              className="lowercase"
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Target Gender</SelectLabel>
                            <Separator className="my-2" />
                            {["male", "female"].map((value) => (
                              <SelectItem
                                key={value}
                                value={value}
                                className="capitalize"
                              >
                                {value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* target age field */}
                <AgeFields />
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

            <div className="col-span-2 !mt-0 flex flex-col gap-4 ">
              {/* Working Hours */}
              <WorkingHours />
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
