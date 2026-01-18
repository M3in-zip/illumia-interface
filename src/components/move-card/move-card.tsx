import moves from "@/data/moves.json";
import { useEffect } from "react";

export interface move {}

interface MoveCardProps {
  move: string;
  onClick?: () => void;
}

export const MoveCard = ({ move, onClick }: MoveCardProps) => {
  const selectedMove = moves.find((current) => current.name === move);
  useEffect(() => {
    console.log("mossa: ", selectedMove);
  }, [selectedMove]);

  return (
    <div className={`border-primary rounded-xl p-2 flex flex-row items-center gap-4 ${
              selectedMove?.type.toLowerCase()}-card cursor-pointer`} 
              onClick={onClick}>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-row items-center gap-2">
          <span className="font-semibold text-2xl">
            {selectedMove?.name
              ? selectedMove.name.toUpperCase()
              : "name not found"}
          </span>
          <div
            className={`border-primary text-primary font-semibold rounded-full py-1 px-3 flex ${
              selectedMove?.type.toLowerCase()}`}
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
