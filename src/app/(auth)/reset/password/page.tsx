import VerifyUser from "@/components/VerifyUser";
import { getAuthSession } from "@/lib/authOption";
import { redirect } from "next/navigation";
import Image from "next/image";
import ChangePassword from "@/components/auth/ChangePassword";

export default async function Page() {
  const sesssion = await getAuthSession();
  if (!sesssion) {
    redirect("/login");
  }
  return (
    <main className="relative min-h-screen h-[000px] w-full flex items-center justify-center ">
      <Image
        src="https://source.unsplash.com/random"
        alt="background image"
        fill
        className="overlay fixed inset-0 top-0 left-0"
      />
      <div className="fixed top-0 left-0 inset-0 z-0 bg-black opacity-50"></div>

      {/* <VerifyUser
        user={sesssion.user}
        className="relative z-50 bg-white min-w-[400px] mx-auto p-4  text-center"
      /> */}
      <ChangePassword classname="overflow-y-scroll" user={sesssion.user} />
    </main>
  );
}
