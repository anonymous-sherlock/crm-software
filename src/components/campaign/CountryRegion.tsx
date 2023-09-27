"use client";
import React, { FC, useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { allCountries } from "country-region-data";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface CountryRegionProps {}

const CountryRegion: FC<CountryRegionProps> = ({}) => {
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [regionOpen, setRegionOpen] = useState(false);
  const { control, getValues, setValue, clearErrors, register, setError } =
    useFormContext();

  const selectedRegionRef = useRef<Array<string>>([]);

  const handleRegionSelect = (region: string) => {
    selectedRegionRef.current = selectedRegionRef.current.includes(region)
      ? selectedRegionRef.current.filter((r) => r !== region)
      : [...selectedRegionRef.current, region];
    setValue("targetRegion", selectedRegionRef.current);
    if (selectedRegionRef.current.length === 0) {
      setError("targetRegion", {
        type: "required",
        message: "Please select at least one region.",
      });
    } else {
      clearErrors("targetRegion"); // Remove the error
    }

    console.log(getValues("targetRegion"));
  };

  return (
    <>
      {/* target country */}
      <FormField
        control={control}
        name="targetCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Country</FormLabel>
            <FormControl>
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={countryOpen}
                      className={cn(
                        "w-full justify-between h-11",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? field.value : "Select a Country"}
                      <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command className="m-0 h-full w-full p-0">
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup heading="Country">
                        {allCountries.map((country, index) => (
                          <CommandItem
                            key={index}
                            value={country[0]}
                            className="capitalize my-2 cursor-pointer"
                            onSelect={() => {
                              setValue("targetCountry", country[0]);
                              clearErrors("targetCountry");
                              setSelectedCountry(country[0]);
                              setCountryOpen(false);
                              setValue("targetRegion", []);
                              selectedRegionRef.current = [];
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-1 h-4 w-4",
                                country[0] === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country[0]}
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

      <FormField
        control={control}
        name="targetRegion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Region</FormLabel>
            <FormControl>
              <Popover open={regionOpen} onOpenChange={setRegionOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={regionOpen}
                      className={cn(
                        "w-full justify-between h-11",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {selectedRegionRef.current.length > 0
                        ? `${
                            selectedRegionRef.current.length
                          }${" "}region selected`
                        : "Select a Region"}
                      <ChevronsUpDown className=" h-3 w-3 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command className="m-0 h-full w-full p-0">
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No region found.</CommandEmpty>
                      <CommandGroup heading="Region">
                        {allCountries
                          .filter((country) => country[0] === selectedCountry)
                          .map((country) =>
                            country[2].map((region, index) => (
                              <CommandItem
                                key={index}
                                value={region.toString()}
                                className="capitalize my-2"
                                onSelect={() => {
                                  handleRegionSelect(region[0]);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-1 h-4 w-4",
                                    selectedRegionRef.current.includes(
                                      region[0]
                                    )
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <span>{region[0]}</span>
                                <span className="ml-auto">({region[1]})</span>
                              </CommandItem>
                            ))
                          )}
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

      {/* target region */}
    </>
  );
};

export default CountryRegion;
