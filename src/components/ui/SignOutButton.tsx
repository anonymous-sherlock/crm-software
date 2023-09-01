"use client";
import React from "react";
import { Button } from "./button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className: string;
  iconSize: number;
};

function SignOutButton({ children, className, iconSize }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut()}
      className={cn("flex gap-2 w-full justify-start", className)}
    >
      <LogOut size={iconSize} />
      {children}
    </Button>
  );
}

export default SignOutButton;
