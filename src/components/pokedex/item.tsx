"use client";

import type { Pokemon } from "@/types/pokemon/list";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PokemonItem({ pokemon }: { pokemon: Pokemon }) {
  const router = useRouter();
  router.prefetch(`/${pokemon.name}`);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [prefetchingLabel, setPrefetchingLabel] = useState("Loading...");

  const handleClick = () => {
    router.push(`/${pokemon.name}`);
    setIsPrefetching(true);
    setTimeout(() => {
      setPrefetchingLabel("Prefetching...");
    }, 500);
  };

  return (
    <li className="py-4 px-8 w-full flex justify-between items-center">
      <span className="capitalize ">{pokemon.name}</span>
      <Button onClick={handleClick} disabled={isPrefetching}>
        {isPrefetching ? prefetchingLabel : "Lihat Detail"}
      </Button>
    </li>
  );
}
