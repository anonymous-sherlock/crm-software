"use server"
import {
  Activity,
  CiCreditCard1,
  HelpCircle,
  HiOutlineUser,
  LifeBuoy,
  Settings,
} from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SignOutButton from "./ui/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserAvatar } from "./user/UserAvatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { generateInitialFromName } from "@/lib/utils";

export async function UserProfileDropdown() {
  const session = await getServerSession(authOptions);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex cursor-pointer items-center justify-start ring-slate-400 duration-200 hover:ring-2 focus:ring-4"
      >
        <Avatar className="">
          <AvatarImage src={session?.user.image as string} alt={session?.user.name as string} />
          <AvatarFallback className="bg-slate-200 text-base font-medium">
            {generateInitialFromName(session?.user.name as string)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center justify-start gap-2">
            <UserAvatar />
            <div>
              <span className="block text-xs text-gray-900 dark:text-white">
                {session?.user.name}
              </span>
              <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                {session?.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HiOutlineUser size={16} className="mr-2 text-gray-400" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CiCreditCard1 size={16} className="mr-2 text-gray-400" />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings size={16} className="mr-2 text-gray-400" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Activity size={16} className="mr-2 text-gray-400" />
            Activity Log
            <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy size={16} className="mr-2 text-gray-400" />
          Support
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle size={16} className="mr-2 text-gray-400" />
          Help
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton iconSize={16} className="w-full p-1 text-gray-400">
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
