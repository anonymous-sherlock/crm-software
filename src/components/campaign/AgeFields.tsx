import { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
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

interface AgeFieldsProps {}

const AgeFields: FC<AgeFieldsProps> = ({}) => {
  const { control, getValues, setValue, formState, register } =
    useFormContext();

  const ageNumbers = Array.from({ length: 48 }, (_, index) => 18 + index);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField
          control={control}
          name="targetAge.min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Age</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl className="capitalize">
                  <SelectTrigger className="w-full capitalize h-11">
                    <SelectValue
                      placeholder="Min Age"
                      className="text-muted-foreground"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <ScrollArea className="h-72 ">
                    <SelectGroup>
                      <SelectLabel>Min Age</SelectLabel>
                      <Separator className="my-1" />
                      {ageNumbers.map((age, index) => (
                        <SelectItem key={index} value={age.toString()}>
                          {age}
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
          name="targetAge.max"
          render={({ field }) => (
            <FormItem>
              {/* end time */}

              <Select onValueChange={field.onChange}>
                <FormControl className="capitalize">
                  <SelectTrigger className="w-full capitalize h-11">
                    <SelectValue
                      placeholder="Max Age"
                      className="text-muted-foreground"
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <ScrollArea className="h-72 ">
                    <SelectGroup>
                      <SelectLabel>Max Age</SelectLabel>
                      <Separator className="my-1" />
                      {ageNumbers.map((age, index) => (
                        <SelectItem key={index} value={age.toString()}>
                          {index === ageNumbers.length - 1 ? `${age}+` : age}
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
      </div>
    </>
  );
};

export default AgeFields;
