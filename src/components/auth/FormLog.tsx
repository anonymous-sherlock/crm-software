"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthFormProps } from "@/types/authForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordToggle from "./PasswordToggle";
import { registerFormSchema, loginFormSchema } from "@/schema/authFormSchema";
import Spinner from "@/ui/spinner";
import { newUserResponse } from "@/types";
import { toast } from "@/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function FormLog({ isRegister }: AuthFormProps) {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);

  const formSchema = isRegister ? registerFormSchema : loginFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isRegister) {
      setLoading(true);
      const res = await fetch("/api/user/adduser", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as newUserResponse;
      setLoading(false);
      if (data.success) {
        toast({
          variant: "success",
          title: "User Created",
          description: data.message,
        });
        await signIn("credentials", {
          email: values.email,
          password: values.password,
        });
      } else if (data.errors) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.errors,
        });
      }
    } else {
      const loginResponse = await handleLogin(values, setLoading);
      if (loginResponse) {
        router.push("/dashboard");
      }
    }
  }

  return (
    <section className=" mt-8 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          method="post"
        >
          {/* full name */}
          {isRegister && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                      className="mt-2 h-12 w-full rounded-lg border bg-gray-50 px-4 py-3 ring-primary focus:outline-none focus:ring-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="hello@example.com"
                    {...field}
                    className="mt-2 h-12 w-full rounded-lg border bg-gray-50 px-4 py-3 ring-primary focus:outline-none focus:ring-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* password */}
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
          {isRegister && (
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
          )}

          {/* Display the Forgot Password link only for login */}
          {!isRegister && (
            <div className="mt-2 text-right">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>
          )}
          <Button
            type="submit"
            size="xlg"
            className="text-md mt-8 flex w-full items-center justify-center rounded-lg bg-primary px-4 font-semibold
            text-white hover:bg-indigo-900 focus:bg-indigo-400"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner />
                {isRegister ? "Registering..." : "Logging in..."}
              </>
            ) : isRegister ? (
              "Register"
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}

async function handleLogin(
  values: z.infer<typeof loginFormSchema>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (response) {
      // Check if response is not undefined
      if (response.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error,
        });
        return null;
      } else {
        toast({
          variant: "success",
          title: "Login Successful",
          description: "Loging into your account",
        });
        return true;
      }
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Error logging in",
    });
  } finally {
    setLoading(false);
  }
  return false;
}
