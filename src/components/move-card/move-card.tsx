import moves from "@/data/moves.json";
import { useThemeStore } from "@stores/theme-store";

export interface move {}

interface MoveCardProps {
  move: string;
  onClick?: (move: string) => void;
}

export const MoveCard = ({ move, onClick }: MoveCardProps) => {
  const theme = useThemeStore((state) => state.theme);
  const selectedMove = moves.find((current) => current.name === move);
  const moveIconSrc = (damage_class: string) => {
  switch (damage_class.toLowerCase()) {
    case "physical":
      return "https://img.pokemondb.net/images/icons/move-physical.png";
    case "special":
      return "https://img.pokemondb.net/images/icons/move-special.png";
    case "status":
      return "https://img.pokemondb.net/images/icons/move-status.png";
    default:
      return null;
  }
};

  return (
    <div className={`border-primary rounded-xl p-1 flex flex-row items-center gap-4 min-w-220 ${
              selectedMove?.type.toLowerCase()}-card cursor-pointer justify-between`}
              onMouseDown={onClick ? () => onClick(move) : undefined}>

      {/* first block */}
      <div className="flex flex-col justify-between flex-1">

        {/* name + type */}
        <div className="flex flex-row items-center gap-2 justify-between">
          <span className="font-semibold text-2xl">
            {selectedMove?.name
              ? selectedMove.name
              : "name not found"}
          </span>
          <div
            className={`border-primary text-primary font-semibold rounded-full py-1 px-3 flex ${
              selectedMove?.type.toLowerCase()}`}
          >
            {selectedMove?.type.toUpperCase() || "???"}
          </div>
          <div className="border-2 border-white rounded-lg bg-gray-300">
            {selectedMove?.damage_class && (
              <img
                src={moveIconSrc(selectedMove.damage_class) || ""}
                alt={selectedMove.damage_class}
                className="w-6 h-6"
              />
            )}
          </div>
        </div>

        {/* power, accuracy, pp */}
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

      {/* description */}
      <div className="flex w-[50%]">
      <p>{selectedMove?.description}</p>
      </div>
    </div>
  );
};
