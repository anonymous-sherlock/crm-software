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
      <nav className="absolute right-0 top-0 w-full justify-between border-gray-200 bg-white/95 backdrop-blur-sm before:shadow-[-2px_3px_90px_-20px_rgb(0_0_0_/_25%)] dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ">
            Your Manager
          </span>

          <div className="flex flex-1 items-center justify-end space-x-4 md:order-2 ">
            <ThemeToggle />
            <LanguageToggle />
            {session ? (
              <>
                <SignOutButton />
                <UserProfile session={session} />
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
