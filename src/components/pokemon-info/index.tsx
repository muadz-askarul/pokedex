"use client";

import { getPokemonInfo } from "@/server/pokemon/find/query";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PokemonDetail } from "@/types/pokemon/detail";
import { useGlobalStore } from "@/stores/global.store";
import pokeball from "../../../public/64px-Poké_Ball_icon.png";
import { PokemonInfoCard } from "./card";

export default function PokemonInfo({ slug }: { slug: string }) {
  const { isCaptured, catchPokemon, releasePokemon, capturedPokemon } =
    useGlobalStore();

  const router = useRouter();

  const [pokemon, setPokemon] = useState<PokemonDetail | undefined>();

  const captured = useMemo(() => {
    if (!pokemon || !capturedPokemon.length) return false;
    return isCaptured(pokemon.name);
  }, [capturedPokemon, isCaptured, pokemon]);

  const pokemonImg = useMemo(
    () =>
      pokemon?.sprites.other?.["official-artwork"].front_default ??
      pokemon?.sprites.front_default ??
      "",
    [pokemon]
  );

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["pokemon", slug],
    queryFn: async () => getPokemonInfo(slug),
  });

  useEffect(() => {
    if (!data || !data.data) return;
    setPokemon(data.data);
  }, [data]);

  if (isError) {
    return (
      <p className="wrapper">{"message" in error ? error.message : error}</p>
    );
  }

  const handleCatchEvent = (pokemon: PokemonDetail) => {
    if (!pokemon) return;
    if (captured) {
      return releasePokemon(pokemon.name);
    }
    catchPokemon(pokemon);
  };

  const handleCry = (pokemon: PokemonDetail) => {
    const audio = new Audio(pokemon.cries.latest);
    audio.play();
  };

  return (
    <div className="px-2 py-4 overflow-auto md:h-[calc(100vh-90px)] h-[calc(100vh-90px)] rounded-lg bg-slate-50 mx-4 flex flex-col">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="rounded-full bg-yellow-300 text-blue-700 border-blue-700 border-[3px] mb-4 font-bold h-10 w-10"
        onClick={() => router.replace("/")}
      >
        <ArrowLeftIcon />
      </Button>

      {!data && !isLoading && !isFetching && (
        <div className="text-center text-4xl p-12">
          It looks like <span className="capitalize font-bold">{slug}</span>{" "}
          avoids you 😩
        </div>
      )}

      {(isFetching || isLoading) && (
        <div className="text-center text-4xl p-12">Loading...</div>
      )}

      {pokemon && (
        <>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <Image
              src={pokemonImg}
              alt={pokemon.name}
              width={256}
              height={256}
            />
            <h2 className="flex-grow text-center text-[42px] font-bold capitalize">
              {pokemon.name}
            </h2>

            <div className="flex gap-2">
              <Button onClick={() => handleCatchEvent(pokemon)}>
                {captured ? "Release " : "Catch "}
                <Image
                  src={pokeball}
                  alt="pokeball"
                  width={24}
                  height={24}
                />{" "}
              </Button>

              <Button onClick={() => handleCry(pokemon)}>Sound 🔊</Button>
            </div>

            <div
              id="attributes"
              className="flex md:flex-row flex-col gap-4 divide-x-2 w-full p-4"
            >
              <PokemonInfoCard
                title="Type"
                list={pokemon.types.map(({ type }) => type.name)}
              />
              <PokemonInfoCard
                title="Abilities"
                list={pokemon.abilities.map(({ ability }) => ability.name)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
