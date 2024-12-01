import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import TanstackProviders from "../../components/providers/tanstack-provider";
import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Pokédex by Muadz",
  description: "Implementation of Pokédex with PokeAPI by Muadz",
};

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackProviders>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-grow bg-red-600 flex flex-col gap-[0.12rem]">
          <Header />
          {children}
        </div>
      </SidebarProvider>
    </TanstackProviders>
  );
}
