import { serverClient } from "@/app/_trpc/serverClient";
import { UserProfileForm } from "@/components/profile/UserProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/authOption";
import { generateInitialFromName } from "@/lib/utils";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";


async function getData() {
  const session = await getAuthSession();
  if (!session?.user || !session.user.id) {
    redirect("/login");
  }

  const user = await serverClient.user.get()
  return user;
}


const Profile = async () => {
  const user = await getData();
  if (!user)
    return notFound()

  return (
    <main className="flex ">
      <Card className="w-full overflow-hidden">
        <div className="min-h-[200px] w-full relative">
          <Image src="/default-profile-cover.png" fill alt="" />
          <div className="absolute -bottom-1/2 -translate-y-1/2 border-white border-4 left-4 w-[120px] h-[120px] rounded-full bg-gray-200">
            <Avatar className="w-full h-full cursor-pointer">
              <AvatarImage src={user?.image || `https://github.com/shadcn.png`} alt="Profile image" />
              <AvatarFallback className="text-2xl ">{generateInitialFromName(user?.name!)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="mt-16 p-8 pt-0">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium">{user?.name}</h3>
            </div>
            <Separator />
            <UserProfileForm user={user} />
          </div>
        </CardContent>
      </Card>
    </main >
  );
};

export default Profile;
