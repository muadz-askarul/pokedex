import { Pokemon } from "@/types/pokemon/list";

export type PokemonRespDTO = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Pokemon>;
};
