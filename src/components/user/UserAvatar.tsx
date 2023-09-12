import { generateInitialFromName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { User } from "next-auth";

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>
  className? : string
}

export const UserAvatar = async ({ user , className}: UserAvatarProps) => {

  return (
    <Avatar className="">
      <AvatarImage
        src={user.image as string}
        alt={user.name as string}
      />
      <AvatarFallback className="bg-slate-200 text-base font-medium">
        {user.name && generateInitialFromName(user.name)}
      </AvatarFallback>
    </Avatar>
  );
};
