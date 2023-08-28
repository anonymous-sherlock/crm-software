"use client";
import google from "@/assets/social/google.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { userSchema } from "@/schema/userSchema";
import { useToast } from "@/ui/use-toast";
import { ArrowLeftToLine, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { z } from "zod";

interface AuthFormProps {
  isRegister?: boolean; // Prop to indicate if the form is for registration
}

interface formProps {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const AuthForm: FC<AuthFormProps> = ({ isRegister }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState(isRegister ? "Register" : "Login");
  const [formData, setFormData] = useState<formProps>({});
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginWithGoogle = async () => {
    await signIn("google");
  };

  const validation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isRegister) {
        await RegisterUser();
      } else {
        await LoginUser();
      }
    } catch (error) {
      // handle error
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const RegisterUser = async () => {
    try {
      const result = userSchema.parse(formData);

      if (result) {
        const res = await fetch("/api/user/adduser", {
          method: "POST",
          body: JSON.stringify(result),
        });
        const data = await res.json();
        if (data.success) {
          await signIn("credentials", {
            email: result.email,
            password: result.password,
          });
        }

        if (data.errors) {
        } else {
          // Success
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues[0].message;
        toast({
          variant: "destructive",
          title: "Validation Error:",
          description: errorMessages,
        });
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  const LoginUser = async () => {
    setLoading(true);
    if (formData !== null) {
      const { email, password } = formData;
      try {
        await signIn("credentials", {
          email: email,
          password: password,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error as string ,
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-100 relative w-full rounded-md bg-white p-10 shadow-lg">
      <Button
        asChild
        className="absolute right-0 top-2 text-sm transition-all duration-300 hover:text-primary"
        variant="link"
      >
        <Link href="/">
          <ArrowLeftToLine className="mr-2" size={16} />
          Go Back To Home
        </Link>
      </Button>
      <h1 className="mb-2 mt-4 text-xl font-bold leading-tight md:text-2xl">
        {formType} to your account
      </h1>

      <form className="mt-4" method="POST" onSubmit={(e) => e.preventDefault()}>
        {/* Display the username field only for registration */}
        {isRegister && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full rounded-lg border bg-gray-50 px-4 py-3 ring-primary focus:outline-none focus:ring-1"
              autoFocus
              required
              onChange={handleChange}
            />
          </div>
        )}
        <div className="mt-2">
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            className="mt-2 w-full rounded-lg border bg-gray-50 px-4 py-3 ring-primary focus:outline-none focus:ring-1"
            autoFocus
            required
            onChange={handleChange}
          />
        </div>
        <div className="relative mt-4">
          <input
            type={passwordType}
            name="password"
            placeholder="Enter Password"
            className=" w-full rounded-lg border bg-gray-50 px-4 py-3 ring-primary focus:outline-none
            focus:ring-1"
            required
            onChange={handleChange}
          />
          <span
            className="absolute  right-0 top-0 z-10 flex h-full w-12 cursor-pointer items-center justify-center rounded-lg  bg-gray-300  text-primary  ring-gray-700 transition-all duration-200 hover:bg-primary hover:text-white hover:ring-1"
            onClick={togglePassword}
          >
            {passwordType !== "text" ? (
              <EyeOff className="w-5" />
            ) : (
              <Eye className="w-5" />
            )}
          </span>
        </div>

        {isRegister && (
          <div className="mt-2">
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              className="mt-2 w-full rounded-lg border bg-gray-50 px-4 py-3 ring-primary focus:outline-none focus:ring-1"
              autoFocus
              required
              onChange={handleChange}
            />
          </div>
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

        <button
          type="submit"
          className="mt-6 block w-full rounded-lg bg-primary px-4 py-3 font-semibold
            text-white hover:bg-indigo-900 focus:bg-indigo-400"
          disabled={loading}
          onClick={validation}
        >
          {formType}
        </button>
      </form>

      <div className="my-6 grid grid-cols-3 items-center text-gray-500">
        <hr className="border-gray-500" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-500" />
      </div>

      <Button
        className={cn(
          "flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-6 font-semibold text-gray-900 duration-300 hover:bg-black hover:text-white focus:bg-black focus:text-white"
        )}
        variant="secondary"
        onClick={loginWithGoogle}
      >
        <Image src={google} width={26} height={26} alt="" />
        <span className="ml-4">Log in with Google</span>
      </Button>

      {isRegister ? (
        <p className="mt-8">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="font-semibold text-blue-500 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      ) : (
        <p className="mt-8">
          Need an account?{" "}
          <Link
            href={"/register"}
            className="font-semibold text-blue-500 hover:text-blue-700"
          >
            Create an account
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
