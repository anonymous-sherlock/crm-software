import { serverClient } from "@/app/_trpc/serverClient";
import Account from "@/components/profile/Account";
import { Integration } from "@/components/profile/Integration";
import { NotificationsForm } from "@/components/profile/NotificationForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuthSession } from "@/lib/authOption";
import { generateInitialFromName } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getAuthSession();
  if (!session?.user || !session.user.id) {
    redirect("/login");
  }
  const { user } = session;

  const userData = await serverClient.user.get()

  return (
    <main className="flex ">

      <Card className="w-full overflow-hidden">
        <div className="min-h-[200px] w-full relative">
          <Image src="/default-profile-cover.png" fill alt="" />
          <div className="absolute -bottom-1/2 -translate-y-1/2 border-white border-4 left-4 w-[120px] h-[120px] rounded-full bg-gray-200">
            <Label htmlFor="profile-avatar" className="bg-transparent w-full h-full">
              <Avatar className="w-full h-full cursor-pointer">
                <AvatarImage src={user?.image || `https://github.com/shadcn.png`} alt="Profile image" />
                <AvatarFallback className="text-2xl ">{generateInitialFromName(user?.name!)}</AvatarFallback>
              </Avatar>
            </Label>
          </div>
        </div>
        <CardContent className="mt-16 p-8 pt-0">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium">{user?.name}</h3>
            </div>
            <Separator />
            <div className="flex-1 space-y-4 p-8 pl-0 pt-6">
              <Tabs defaultValue="account" className="space-y-4">
                <TabsList className="text-2xl capitalize font-medium space-x-4">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="notification">Notification</TabsTrigger>
                  <TabsTrigger value="integration">Integration</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="w-full" >
                  <Account user={userData} />
                </TabsContent>
                <TabsContent value="notification" className="w-full" >
                  <NotificationsForm />
                </TabsContent>
                <TabsContent value="integration" className="w-full" >
                  <Integration />
                </TabsContent>
                <TabsContent value="password" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you&apos;ll be logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </main >
  );
};

export default Profile;
