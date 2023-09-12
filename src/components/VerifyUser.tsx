"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  VerifyUserTokenPayload,
  verifyUserSchema,
} from "@/schema/verifyUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { generateInitialFromName } from "@/lib/utils";
import { UserAvatar } from "./user/UserAvatar";
import Spinner from "./ui/spinner";
import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";

interface VerifyUserProps {
  className: string;
  user: Pick<User, "name" | "image" | "email">;
}

const VerifyUser: FC<VerifyUserProps> = ({ className, user }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof verifyUserSchema>>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      verifyToken: "",
    },
  });
  const { mutate: verifyUser, isLoading } = useMutation({
    mutationFn: async (input: string) => {
      const payload: VerifyUserTokenPayload = {
        verifyToken: input,
      };

      const { data } = await axios.post("/api/auth/user", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Cannot Verify Token.",
            description: "",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      router.push("/dashboard");
    },
  });

  async function onSubmit(values: z.infer<typeof verifyUserSchema>) {
    verifyUser(values.verifyToken);
  }

  return (
    <Card className={className}>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
            method="post"
          >
            <div className="grid justify-items-stretch ">
              <div className="flex items-center justify-start gap-2">
                <Avatar className="w-12 h-12 rounded-full ">
                  <AvatarImage
                    src={user.image as string}
                    alt={user.name as string}
                    className="rounded-full"
                  />
                  <AvatarFallback className="bg-slate-200 text-base font-medium">
                    {generateInitialFromName(user.name as string)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-start">
                  <span className="block text-xs text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                  <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* product price */}
              <FormField
                control={form.control}
                name="verifyToken"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Verification Token"
                        {...field}
                        className="mt-2  h-12 w-full rounded-lg border bg-gray-50 flex-1 py-3 ring-primary focus:outline-none focus:ring-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="xlg"
                className="text-md mt-4 flex w-full items-center justify-center rounded-lg bg-primary px-4 font-semibold
            text-white hover:bg-indigo-900 focus:bg-indigo-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    {" "}
                    <Spinner />
                    Verifying
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyUser;
