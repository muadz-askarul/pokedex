"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/server/get-query-client";
import { ReactNode } from "react";

interface TanstackProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: TanstackProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
