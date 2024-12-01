import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PokemonDetail } from "@/types/pokemon/detail";

type GlobalStore = {
  capturedPokemon: Array<PokemonDetail>;
  catchPokemon: (newPokemon: PokemonDetail) => void;
  releasePokemon: (name: string) => void;
  isCaptured: (name: string) => boolean;
};

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      capturedPokemon: [],
      catchPokemon: (newPokemon: PokemonDetail) => {
        return set({
          capturedPokemon: [...get().capturedPokemon, newPokemon],
        });
      },
      releasePokemon: (name: string) => {
        const foundIdx = get().capturedPokemon.findIndex(
          (pokemon) => pokemon.name === name
        );

        if (foundIdx === -1) return;
        const capturedPokemon = [...get().capturedPokemon];
        capturedPokemon.splice(foundIdx, 1);
        return set({
          capturedPokemon,
        });
      },
      isCaptured: (name: string) => {
        return get().capturedPokemon.some((pokemon) => pokemon.name === name);
      },
    }),
    {
      name: "your-pokemon",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
