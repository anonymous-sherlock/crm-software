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
import { Label } from "../ui/label";
import { timeOptions } from "@/constants/time";
import { ScrollArea } from "../ui/scroll-area";

interface WorkingHoursProps {}

const WorkingHours: FC<WorkingHoursProps> = ({}) => {
  const { control, getValues, setValue, formState, register } =
    useFormContext();

  return (
    <>
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField
          control={control}
          name="workingHours.startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Working Hours</FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Start Time" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-72 ">
                    <SelectGroup>
                      <SelectLabel>Start Time</SelectLabel>
                      <Separator className="my-2" />
                      {timeOptions.map((time, index) => (
                        <SelectItem key={index} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
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
              {/* end time */}

              <Select onValueChange={field.onChange}>
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
