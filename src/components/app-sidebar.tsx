import pokeball from "../../public/64px-Poké_Ball_icon.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { AppSidebarMenu } from "./sidebar-menu";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-red-600">
        <SidebarGroup className="divide-y-2 h-full">
          <SidebarGroupLabel className="text-xl bg-red-600 rounded-none h-[50px] text-white font-bold justify-center gap-4">
            <Image src={pokeball} alt="pokeball" width={42} height={42} />{" "}
            <span>Your Pokémon</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex-grow rounded-lg bg-slate-100 mt-4 mb-2">
            <AppSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
