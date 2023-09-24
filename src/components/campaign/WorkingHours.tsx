"use client";
import React, { useEffect } from "react";
import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { campaignFormSchema } from "@/schema/campaignSchema";

interface WorkingHoursProps {}

const WorkingHours: FC<WorkingHoursProps> = ({}) => {
  const { control, getValues, setValue, formState, register } =
    useFormContext();

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <FormField
          control={control}
          name="workingHours.startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Working Hours</FormLabel>

              {/* start time */}
              <Select
                name=""
                onValueChange={field.value}
                defaultValue={field.value}
              >
                <FormControl className="capitalize">
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue
                      placeholder="Start Time"
                      className="text-muted-foreground"
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Start Time</SelectLabel>
                    <Separator className="my-2" />
                    <SelectItem value="5:30 PM">5:30 PM</SelectItem>
                    <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="workingHours.endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Working Hours</FormLabel>

              {/* start time */}
              {/* end time */}
              <Select
                onValueChange={() => {
                  setValue("workingHours.endTime", field.onChange);
                  console.log(getValues("workingHours"));
                }}
                defaultValue={field.value}
              >
                <FormControl className="capitalize">
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue
                      placeholder="End Time"
                      className="text-muted-foreground"
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>End Time</SelectLabel>
                    <Separator className="my-2" />
                    <SelectItem value="5:30 PM">5:30 PM</SelectItem>
                    <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default WorkingHours;
