import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import favicon from "@/public/favicon.png";
import Providers from "@/providers/index";
import { SearchBox } from "@/components/SearchBox";
import 'react-loading-skeleton/dist/skeleton.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adscrush Crm",
  description: "Manage Your Order Status",
  icons: favicon.src,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
        <SearchBox />
      </body>
    </html>
  );
}
