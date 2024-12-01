"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ZapIcon } from "lucide-react";
import PokemonItem from "./item";
import { useMemo } from "react";
import { getPokemonList } from "@/server/pokemon/get/query";

export default function Pokedex() {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemon-list", 0],
    queryFn: ({ pageParam }) => getPokemonList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.next) {
        return allPages.length;
      }
    },
  });

  const pokedex = useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.map((page) => page.data.results).flat();
  }, [data]);

  if (isError) {
    return (
      <p className="wrapper">{"message" in error ? error.message : error}</p>
    );
  }

  return (
    <ul className="divide-y-2 px-2 overflow-auto h-[calc(100vh-90px)] rounded-lg bg-slate-50 mx-4">
      {(isFetching || isLoading) && (
        <li className="text-center text-xl p-12">Loading...</li>
      )}
      {pokedex.length > 0 &&
        pokedex.map((pokemon) => (
          <PokemonItem key={pokemon.name} pokemon={pokemon} />
        ))}
      {!data ||
        (data.pages.length === 0 && (
          <li>It looks like all pokémon avoids you 😩</li>
        ))}
      <Button
        variant={"default"}
        size="lg"
        className="w-full my-2 bg-yellow-300 text-black font-bold hover:bg-yellow-500 hover:text-white"
        disabled={!hasNextPage || isFetchingNextPage || isFetching}
        onClick={() => {
          fetchNextPage();
        }}
      >
        <span>Load More Pokémon</span>
        <ZapIcon />
      </Button>
    </ul>
  );
}
