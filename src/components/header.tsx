"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center m-4">
      <Button
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full bg-blue-700 text-white border-white border-[3px]"
        onClick={() => {
          toggleSidebar();
        }}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <h1 className="flex-grow text-center text-3xl text-white font-bold">
        Pokédex
      </h1>
    </div>
  );
}
