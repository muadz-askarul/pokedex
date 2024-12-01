import axios from "axios";
import { PokemonDetailRespDTO } from "./resp.dto";

export async function getPokemonInfo(idx: string) {
  try {
    return await axios.get<PokemonDetailRespDTO>(
      `https://pokeapi.co/api/v2/pokemon/${idx}`
    );
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    throw error;
  }
}
