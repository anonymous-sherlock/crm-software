"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftToLine } from "lucide-react";
import Image from "next/image";
import google from "@/assets/social/google.svg";
import Link from "next/link";
import React, { FC, useState } from "react";

interface AuthFormProps {
  isRegister?: boolean; // Prop to indicate if the form is for registration
}

const AuthForm: FC<AuthFormProps> = ({ isRegister }) => {
  const [formType, setFormType] = useState(isRegister ? "Register" : "Login");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
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
      <h1 className="mt-4 text-xl font-bold leading-tight md:text-2xl">
        {formType} to your account
      </h1>

      <form className="mt-4" method="POST" onSubmit={handleSubmit}>
        {/* Display the username field only for registration */}
        {isRegister && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="mt-2 w-full rounded-lg border bg-gray-50 px-4 py-3 focus:border-primary focus:bg-white focus:outline-none"
              autoFocus
              required
            />
          </div>
        )}
        <div className="mt-2">
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            className="mt-2 w-full rounded-lg border bg-gray-50 px-4 py-3 focus:border-primary focus:bg-white focus:outline-none"
            autoFocus
            required
          />
        </div>
        <div className="mt-2">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="mt-2 w-full rounded-lg border bg-gray-50 px-4 py-3 focus:border-primary
            focus:bg-white focus:outline-none"
            required
          />
        </div>

        {isRegister && (
          <div className="mt-2">
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              className="mt-2 w-full rounded-lg border bg-gray-50 px-4 py-3 focus:border-primary focus:bg-white focus:outline-none"
              autoFocus
              required
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
