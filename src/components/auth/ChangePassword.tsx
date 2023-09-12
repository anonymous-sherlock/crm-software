"use client";
import logo from "@/assets/logo.png";
import {
  changePasswordPayload,
  changePasswordSchema,
} from "@/schema/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import PasswordToggle from "./PasswordToggle";
import { Button, buttonVariants } from "../ui/button";
import Spinner from "../ui/spinner";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { cn, generateInitialFromName } from "@/lib/utils";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

interface ChangePasswordProps {
  classname?: string;
  user: User;
}

const ChangePassword: FC<ChangePasswordProps> = ({ classname, user }) => {
  const [passwordType, setPasswordType] = useState("password");

  const router = useRouter();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate: changePassword, isLoading } = useMutation({
    mutationFn: async (input: z.infer<typeof changePasswordSchema>) => {
      const payload: changePasswordPayload = {
        password: input.password,
        confirmPassword: input.confirmPassword!,
      };

      const { data } = await axios.patch("/api/auth/password", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Cannot Change Password Token.",
            description: "",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      router.push("/login");
    },
  });

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    changePassword(values);
  }

  return (
    <div
      className={cn(
        "app-layout-blank flex flex-auto flex-col h-[100vh]",
        classname
      )}
    >
      <div className="h-full flex flex-auto flex-col justify-between">
        <main className="h-full">
          <div className="page-container relative h-full flex flex-auto flex-col">
            <div className="h-full">
              <div className="container mx-auto flex flex-col flex-auto items-center justify-center min-w-0 h-full">
                <div
                  className="card p-6 min-w-[340px] md:min-w-[450px] card-shadow bg-white shadow-sm rounded-sm"
                  role="presentation"
                >
                  <div className="card-body md:p-10">
                    <div className="text-left">
                      <div className="logo" style={{ width: "auto" }}>
                        <h1 className="my-4 text-xl font-semibold leading-3 md:text-2xl flex items-center justify-start gap-2">
                          <Avatar className="w-11 h-11">
                            <AvatarImage
                              src={user.image as string}
                              alt={user.name as string}
                            />
                            <AvatarFallback className="bg-slate-200 text-base font-medium">
                              {generateInitialFromName(user.name as string)}
                            </AvatarFallback>
                          </Avatar>
                          Hi, {user.name}
                        </h1>
                      </div>
                    </div>
                    <div className="text-left">
                      <div>
                        <div className="mb-6">
                          <h3 className="mb-1 font-medium text-slate-500">Set new password</h3>
                          <p className="font-medium text-slate-500">
                            Your new password must different to previos password
                          </p>
                        </div>
                        {/* form */}
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                            method="post"
                          >
                            <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem className="relative">
                                  <FormControl>
                                    <Input
                                      placeholder="Password"
                                      {...field}
                                      type={passwordType}
                                      className="mt-2 h-12 w-full rounded-lg border bg-gray-50 px-4 py-3 ring-primary focus:outline-none focus:ring-1"
                                    />
                                  </FormControl>
                                  <PasswordToggle
                                    passwordType={passwordType}
                                    setPasswordType={setPasswordType}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Confirm Password */}

                            <FormField
                              control={form.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem className="relative">
                                  <FormControl>
                                    <Input
                                      placeholder="Confirm Password"
                                      {...field}
                                      type="password"
                                      className="mt-2 h-12 w-full rounded-lg border bg-gray-50 px-4 py-3 ring-primary focus:outline-none focus:ring-1"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="submit"
                              size="xlg"
                              className="text-md mt-8 flex w-full items-center justify-center rounded-lg bg-primary px-4 font-semibold text-white hover:bg-indigo-900 focus:bg-indigo-400"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <Spinner /> Changing Password...
                                </>
                              ) : (
                                "Change Password"
                              )}
                            </Button>
                          </form>
                          <div className="mt-4 text-center">
                            <span>Back to </span>
                            <Link
                              className="text-indigo-600 hover:underline"
                              href="/login"
                            >
                              Sign in
                            </Link>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChangePassword;
