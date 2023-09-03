import { authOptions } from "@/lib/authOption";
import { generateInitialFromName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Session, getServerSession } from "next-auth";

export const UserAvatar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.name);
  return (
    <Avatar className="">
      <AvatarImage src="https://github.com/shadcn.p ng" alt="@shadcn" />
      <AvatarFallback className="bg-slate-200 text-base font-medium">
        {session?.user.name && generateInitialFromName(session.user.name)}
      </AvatarFallback>
    </Avatar>
  );
};
