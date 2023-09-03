import { Header } from "@/components/layouts/header/Header";
import Sidebar from "@/components/layouts/sidebar/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex bg-secondary dark:bg-primary">
        <Sidebar />
        <div className="relative mx-auto w-full flex-1">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
