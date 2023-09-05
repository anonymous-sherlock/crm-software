import { SidebarLayout } from "@/components/layouts/SidebarLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout> {children}</SidebarLayout>;
}
