import { MoveCard } from "../move-card";

interface MoveListProps {
    moves: string[];
    onClick?: (move: string) => void;
}

export const MoveList = ({ moves, onClick }: MoveListProps) => {
  return (<div className="absolute z-50 mt-12 max-h-[30vh] overflow-y-auto border-2 border-white bg-slate-500 rounded-l-lg p-2">
    {moves.map((move, index) => (
      <MoveCard key={index} move={move} onClick={onClick} />
    ))}
  </div>
  )
};