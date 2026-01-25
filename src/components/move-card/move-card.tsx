import moves from "@/data/moves.json";

export interface move {}

interface MoveCardProps {
  move: string;
  onClick?: (move: string) => void;
}

export const MoveCard = ({ move, onClick }: MoveCardProps) => {
  const selectedMove = moves.find((current) => current.name === move);

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
