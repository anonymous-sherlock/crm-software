"use client";

import { trpc } from "@/app/_trpc/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode, useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { absoluteUrl } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FC<LayoutProps> = ({ children }) => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"),
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
