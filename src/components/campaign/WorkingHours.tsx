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
      <FormField
        control={control}
        name="workingHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Working Hours</FormLabel>

            <div className="grid grid-cols-2 gap-2">
              {/* start time */}
              <Select
                onValueChange={() =>
                  setValue("workingHours.startTime", field.value)
                }
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
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default WorkingHours;
