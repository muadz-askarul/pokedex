"use client";

import PokemonInfo from "@/components/pokemon-info";
import { useParams } from "next/navigation";

export default function PokemonPage() {
  const { slug } = useParams<{ slug: string }>();
  return <PokemonInfo slug={slug} />;
}
