import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout>
      <Breadcrumbs /> {children}
    </SidebarLayout>
  );
}
