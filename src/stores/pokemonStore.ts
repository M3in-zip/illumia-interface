import { create } from "zustand";

interface PokemonBase {
  id: number;
  name: string;
}

export interface pokemonNature {
  name: string;
  increasedStat?: string;
  decreasedStat?: string;
}

interface PokemonStore {
  pokemonList: PokemonBase[];
  setPokemonList: (list: PokemonBase[]) => void;
  natureList: pokemonNature[];
  getNonNeutralNatures: () => pokemonNature[];
}

export const usePokemonStore = create<PokemonStore>((set, get) => {
  const natureList: pokemonNature[] = [
    { name: "Adamant", increasedStat: "Atk", decreasedStat: "Sp. Atk" },
    { name:"Bashful" },
    { name: "Bold", increasedStat: "Def", decreasedStat: "Atk" },
    { name: "Brave", increasedStat: "Atk", decreasedStat: "Speed" },
    { name: "Calm", increasedStat: "Sp. Def", decreasedStat: "Atk" },
    { name: "Careful", increasedStat: "Sp. Def", decreasedStat: "Sp. Atk" },
    { name: "Docile" },
    { name: "Gentle", increasedStat: "Sp. Def", decreasedStat: "Def" },
    { name: "Hardy" },
    { name: "Hasty", increasedStat: "Speed", decreasedStat: "Def" },
    { name: "Impish", increasedStat: "Def", decreasedStat: "Sp. Atk" },
    { name: "Jolly", increasedStat: "Speed", decreasedStat: "Sp. Atk" },
    { name: "Lax", increasedStat: "Def", decreasedStat: "Sp. Def" },
    { name: "Lonely", increasedStat: "Atk", decreasedStat: "Def" },
    { name: "Mild", increasedStat: "Sp. Atk", decreasedStat: "Def" },
    { name: "Modest", increasedStat: "Sp. Atk", decreasedStat: "Atk" },
    { name: "Naive", increasedStat: "Speed", decreasedStat: "Sp. Def" },
    { name: "Naughty", increasedStat: "Atk", decreasedStat: "Sp. Def" },
    { name: "Quiet", increasedStat: "Sp. Atk", decreasedStat: "Speed" },
    { name: "Quirky" },
    { name: "Rash", increasedStat: "Sp. Atk", decreasedStat: "Sp. Def" },
    { name: "Relaxed", increasedStat: "Def", decreasedStat: "Speed" },
    { name: "Sassy", increasedStat: "Sp. Def", decreasedStat: "Speed" },
    { name: "Serious" },
    { name: "Timid", increasedStat: "Speed", decreasedStat: "Atk" },
  ];
  const nonNeutralNatures = natureList.filter(n => n.increasedStat);
  
  return({
  pokemonList: [],
  setPokemonList: (list) => set({ pokemonList: list }),
  natureList: natureList,
  getNonNeutralNatures: () => nonNeutralNatures,
})}
);
