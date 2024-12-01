import { getOffsetParams } from "@/lib/paginate";
import axios from "axios";
import { PokemonRespDTO } from "./resp.dto";

export async function getPokemonList(page: number) {
  try {
    return await axios.get<PokemonRespDTO>(
      `https://pokeapi.co/api/v2/pokemon?${getOffsetParams(page ?? 0, 20)}`
    );
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    throw error;
  }
}
