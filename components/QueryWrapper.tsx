"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

interface Props {
  children?: React.ReactNode;
}
const queryClient = new QueryClient();

export default function QueryWrapper({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* For Navigation */}
      <Toaster />

      {children}
    </QueryClientProvider>
  );
}
