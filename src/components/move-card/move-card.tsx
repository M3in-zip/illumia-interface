import moves from "@/data/moves.json"
import { useEffect } from "react";

export interface move {

}

interface MoveCardProps {
    move:string
}

export const MoveCard = ({ move }: MoveCardProps)=>{
    const selectedMove = moves.find(current => current.name === move);
    useEffect(()=>{console.log("mossa: ", selectedMove)}, [selectedMove])

    return (
        <div>
            
        </div>
    )
}