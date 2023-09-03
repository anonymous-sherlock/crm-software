import { UserAvatar } from "@/components/user/UserAvatar";
import { generateInitialFromName } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserAvatar />
    </main>
  );
}
