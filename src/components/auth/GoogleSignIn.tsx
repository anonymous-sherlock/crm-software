"use client"
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import google from "@/assets/social/google.svg";
import { signIn } from "next-auth/react";

const loginWithGoogle = async () => {
    await signIn("google");
  };
const GoogleSignIn = () => {
  return (
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
  );
};

export default GoogleSignIn;
