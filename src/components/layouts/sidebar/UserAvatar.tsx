import SignOutButton from "@/components/ui/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Activity, Settings } from "lucide-react";
import Link from "next/link";

import { HiOutlineUser } from "react-icons/hi";

const UserAvatar = () => {
  return (
    <HoverCard>
      {/* user image */}
      <HoverCardTrigger asChild>
        <div className="flex items-center justify-start gap-2 border-y p-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>
            <span className="block text-sm text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
              name@adscrush.com
            </span>
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="m-0 w-fit p-0" side="right">
        <div className="">
          <div className="flex items-center justify-start gap-2 border-y p-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                name@adscrush.com
              </span>
            </div>
          </div>
        </div>
        <ul className="" aria-labelledby="user-menu-button">
          <li>
            <Link
              href="#"
              className="m-1 flex items-center justify-start gap-2 rounded-sm p-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <HiOutlineUser size={24} />
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="m-1 flex items-center justify-start gap-2 rounded-sm p-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white "
            >
              <Settings />
              Account Settings
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="m-1 flex items-center justify-start gap-2 rounded-sm border-b p-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white "
            >
              <Activity size={24} />
              Activity Log
            </Link>
          </li>
          <li>
          <SignOutButton iconSize={16} className="text-gray-400 mr-2" > Log out </SignOutButton>
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserAvatar;
