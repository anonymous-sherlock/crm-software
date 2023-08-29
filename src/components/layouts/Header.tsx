import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import UserProfile from "@/components/layouts/UserProfile";
import SignInButton from "@/ui/SignInButton";
import SignOutButton from "@/ui/SignOutButton";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <React.Fragment>
      <nav className="backdrop-blur-sm justify-between bg-white/95 absolute top-0 right-0 w-full border-gray-200 dark:bg-gray-900 before:shadow-[-2px_3px_90px_-20px_rgb(0_0_0_/_25%)]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">
            Your Manager
          </span>

          <div className="flex items-center flex-1 md:order-2 space-x-4 justify-end ">
            <ThemeToggle />
            <LanguageToggle />
            {session ? (
              <>
                <SignOutButton />
                <UserProfile  session={session}/>
              </>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}