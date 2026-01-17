import moves from "@/data/moves.json";
import { useEffect } from "react";

export interface move {}

interface MoveCardProps {
  move: string;
}

/* const typesColor: Record<string, string> = {
  normal: "#cbcaa5",
  fire: "#F08080",
  water: "#6890F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#86d3d3",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#94a0ed",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#7f6b24",
  ghost: "#735797",
  dragon: "#2f44fe",
  dark: "#4e3d32",
  steel: "#B7B7CE",
  fairy: "#d38fb1",
}; */

const typesColor: Record<string, string> = {
  normal: "bg-stone-300/40",
  fire: "bg-red-400/30",
  water: "bg-blue-400/30",
  electric: "bg-yellow-300/40",
  grass: "bg-green-400/30",
  ice: "bg-cyan-300/30",
  fighting: "bg-[#ce3f6b]",
  poison: "bg-purple-500/30",
  ground: "bg-amber-400/40",
  flying: "bg-indigo-300/30",
  psychic: "bg-pink-400/30",
  bug: "bg-lime-400/30",
  rock: "bg-yellow-700/30",
  ghost: "bg-violet-600/30",
  dragon: "bg-indigo-600/30",
  dark: "bg-neutral-700/30",
  steel: "bg-slate-400/40",
  fairy: "bg-pink-300/40",
};

export const MoveCard = ({ move }: MoveCardProps) => {
  const selectedMove = moves.find((current) => current.name === move);
  useEffect(() => {
    console.log("mossa: ", selectedMove);
  }, [selectedMove]);

  return (
    <div className="border-primary rounded-xl p-2 flex flex-row items-center gap-4">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-row items-center gap-2">
          <span className="font-semibold text-2xl">
            {selectedMove?.name
              ? selectedMove.name.toUpperCase()
              : "name not found"}
          </span>
          <div
            className={`border-primary text-primary font-semibold rounded-full py-1 px-3 flex ${
              selectedMove ? typesColor[selectedMove.type] : "bg-slate-200"
            }`}
          >
            {selectedMove?.type.toUpperCase() || "???"}
          </div>
        </div>
        <div className="flex flex-row p-2 gap-2 font-semibold justify-between">
            <div className="flex flex-col items-center">
              <p>Power</p>
              <p>{selectedMove?.power || "--"}</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Accuracy</p>
              <p>{selectedMove?.accuracy || "--"}</p>
            </div>
            <div className="flex flex-col items-center">
              <p>PP</p>
              <p>{selectedMove?.pp || "--"}</p>
            </div>
        </div>
      </div>
      <p>{selectedMove?.description}</p>
    </div>
  );
};
