import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getPokemonBaseList } from "@/api/pokemon.ts";
import { usePokemonStore } from "@/stores/pokemonStore";
import { FullPageSpinner } from "@/components/full-page-spinner";
import { PokemonBuild } from "@/components/pokemon-build";

export const Route = createFileRoute("/calculator")({
  component: PokemonCalculator,
});

function PokemonCalculator() {
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);

  const { data:pokemonList, isLoading:loadingPokemonList, error:errorPokemonList } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => getPokemonBaseList(),
    select: (data) =>
      data.results.map((pokemon: any) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        return {
          name: pokemon.name,
          id: id,
        };
      }),
  });

  useEffect(() => {
    if (pokemonList) setPokemonList(pokemonList);
    if (pokemonList) console.log(usePokemonStore.getState().pokemonList);
  }, [pokemonList, setPokemonList]);

  if (errorPokemonList) return <div className="p-2">Errore nel caricamento</div>;

  return (
    <div className="p-2 w-full">
      {loadingPokemonList && <FullPageSpinner />}
      <PokemonBuild title="Attacker"/>
    </div>
  );
}
