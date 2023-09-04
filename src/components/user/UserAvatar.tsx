"use server"
import { authOptions } from "@/lib/authOption";
import { generateInitialFromName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { getServerSession } from "next-auth";

export const UserAvatar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Avatar className="">
      <AvatarImage
        src={session?.user.image as string}
        alt={session?.user.name as string}
      />
      <AvatarFallback className="bg-slate-200 text-base font-medium">
        {session?.user.name && generateInitialFromName(session.user.name)}
      </AvatarFallback>
    </Avatar>
  );
};
