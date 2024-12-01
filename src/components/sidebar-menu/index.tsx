"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGlobalStore } from "@/stores/global.store";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function AppSidebarMenu() {
  const { capturedPokemon } = useGlobalStore();
  const router = useRouter();

  return (
    <SidebarMenu className="p-4">
      {capturedPokemon.map((pokemon) => (
        <SidebarMenuItem key={pokemon.name}>
          <SidebarMenuButton asChild>
            <Button
              className="h-24 flex items-center gap-4 px-6 justify-start"
              variant={"outline"}
              onClick={() => router.push(`/${pokemon.name}`)}
            >
              <Image
                src={
                  pokemon.sprites.other?.showdown.front_default ??
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                width={54}
                height={54}
              />
              <span className="text-2xl capitalize">{pokemon.name}</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
