import { useState } from "react";
import { MoveList } from "../move-list";

interface PokemonMoveSearchProps {
  moves: string[];
  onClick?: (move: string) => void;
}

export const PokemonMoveSearch = ({
  moves,
  onClick,
}: PokemonMoveSearchProps) => {
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [start, setStart] = useState<string>("");

  const filteredMoves = moves.filter((move) => move.startsWith(start));

  return (
    <div className="p-2">
      <input
        className="border-2 border-white rounded-lg focus:outline-none focus:ring-0 mb-2"
        type="text"
        placeholder="Search move"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        onFocus={() => setListVisible(true)}
        onBlur={() => setListVisible(false)}
      />
      {listVisible && <MoveList moves={filteredMoves} onClick={onClick} />}
    </div>
  );
};
