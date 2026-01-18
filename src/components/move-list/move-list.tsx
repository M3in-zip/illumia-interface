import { MoveCard } from "../move-card";

interface MoveListProps {
    moves: string[];
    onClick?: (move: string) => void;
}

export const MoveList = ({ moves, onClick }: MoveListProps) => {
  return (<div className="p-2">
    {moves.map((move, index) => (
      <MoveCard key={index} move={move} onClick={onClick} />
    ))}
  </div>
  )
};