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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateInitialFromName } from "@/lib/utils";
import { User } from "next-auth";
import SignOutButton from "./ui/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserAvatar } from "./user/UserAvatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild id="radix-:R3r6pcq:" className="flex cursor-pointer items-center justify-start ring-slate-400 duration-200 hover:ring-2 focus:ring-4">
          <Avatar className="">
            <AvatarImage src={user.image as string} alt={user.name as string} />
            <AvatarFallback className="bg-slate-200 text-base font-medium">
              {generateInitialFromName(user.name as string)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="flex items-center justify-start gap-2">
              <UserAvatar user={user} />
              <div>
                <span className="block text-xs text-gray-900 dark:text-white">
                  {user.name}
                </span>
                <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                  {user.email}
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
    </>
  );
}
