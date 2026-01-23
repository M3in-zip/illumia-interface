import { useState } from "react";

interface ModifiersCardProps {
  setModifiers: (modifiers: any) => void;
  modifiers: any;
}

export const ModifiersCard = ({
  setModifiers,
  modifiers,
}: ModifiersCardProps) => {

  const leftButtonClasses = "p-2 border-white border-2 border-r-1 rounded-l-lg";
  const rightButtonClasses = "p-2 border-white border-2 border-l-1 rounded-r-lg";
  const middleButtonClasses = "p-2 border-white border-2 border-l-1 border-r-1";

  const buttonCustom = (className: string, name: string, modifier: string) => {
    const active = modifiers[modifier] === name;

    return(
      <button
        type="button"
        className={`${className} ${active ? "bg-yellow-500" : "bg-gray-200"}`}
        onClick={() => {
          setModifiers({ ...modifiers, [modifier]: active? "" : name });
        }}
      >
        {name.toUpperCase()}
      </button>
    )
  };

  return (
    <div className="flex flex-col items-center">
      <span className="font-semibold">Weather</span>
      <div className="flex flex-row items-center, justify-content p-2">
        {buttonCustom(leftButtonClasses, "sun", "weather")}
        {buttonCustom(middleButtonClasses, "rain", "weather")}
        {buttonCustom(rightButtonClasses, "sand", "weather")}
      </div>
      <div className="flex flex-row items-center, justify-content p-2">
        {buttonCustom(leftButtonClasses, "grassy", "terrain")}
        {buttonCustom(middleButtonClasses, "misty", "terrain")}
        {buttonCustom(middleButtonClasses, "electric", "terrain")}
        {buttonCustom(rightButtonClasses, "psychic", "terrain")}
      </div>
    </div>
  );
};
