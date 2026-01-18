import { MoveCard } from "../move-card";

interface MoveListProps {
    moves: string[];
}

export const MoveList = ({ moves }: MoveListProps) => {

  return (<div>
    {moves.map((move, index) => (
      <MoveCard key={index} move={move} />
    ))}
  </div>
  )
};