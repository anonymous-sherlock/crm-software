"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema, registerFormSchema } from "@/schema/authFormSchema";
import Spinner from "@/ui/spinner";
import { toast } from "@/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCError } from "@trpc/server";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import PasswordToggle from "./PasswordToggle";

export function FormLog({ isRegister }: { isRegister: boolean; }) {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState<"text" | "password">("password");
  const formSchema = isRegister === true ? registerFormSchema : loginFormSchema;
  const [loading, setLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { mutateAsync: addUser, isLoading } = trpc.user.add.useMutation({
    onSuccess(data) {
      if (data.success)
        toast({
          variant: "success",
          title: "User Created",
          description: data.message,
        });
      router.push("/login");
    },
    onError(error) {
      if (error instanceof TRPCError && error.code === 'CONFLICT') {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User with this email already exists",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (isRegister === true) {
        if ('name' in data && 'confirmPassword' in data) {
          await addUser({ ...data });
        }
      } else {
        // login logic here
        await handleLogin(data, setLoading, router);

      }
    } catch (error) {
      if (error instanceof TRPCError)
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        }); else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong try again later.",
        });
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
          {isRegister === true && (
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
                    id=":R2e6qqpcq:-form-item-description"
                    aria-describedby=":R2e6qqpcq:-form-item-description"
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
                    id=":R3e6qqpcq:-form-item"
                    aria-describedby=":R3e6qqpcq:-form-item-description"
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
            disabled={isLoading || loading}
          >
            {isLoading || loading ? (
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: any
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
          description: "Redirecting to dashboard...",
        });
        router.push("/dashboard");
      }
    }
  } catch (error) {
    console.log(error)
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


