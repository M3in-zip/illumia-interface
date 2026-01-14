import { usePokemonStore } from "@/stores/pokemonStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export type Stat = "HP" | "Atk" | "Def" | "Sp. Atk" | "Sp. Def" | "Speed";
export type StatValue = number | "";

interface IVEVProps {
  baseStats: number[];
  onBlur?: () => void;
}

export const PokemonStats = ({ baseStats }: IVEVProps) => {
  const [selectedNature, setSelectedNature] = useState<string>("--");
  const [IVs, setIVs] = useState<Record<Stat, StatValue>>({ HP: 31, Atk: 31, Def: 31, "Sp. Atk": 31, "Sp. Def": 31, Speed: 31 });
  const [EVs, setEVs] = useState<Record<Stat, StatValue>>({ HP: 0, Atk: 0, Def: 0, "Sp. Atk": 0, "Sp. Def": 0, Speed: 0 });
  
  const nonNeutralNatures = usePokemonStore((state) =>
    state.getNonNeutralNatures()
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stat: Stat,
    type: "IV" | "EV"
  ) => {
    var nextValue = e.target.value ? parseInt(e.target.value) : "";
    const numericValue = typeof nextValue === "number" ? nextValue : 0;

    if (type === "IV") {
      if (numericValue > 31) nextValue = 31;
      setIVs({ ...IVs, [stat]: nextValue });
    } else {
      if (numericValue > 252) return;
      const totalEVWithoutCurrent = Object.entries(EVs).reduce(
        (acc, [key, val]) =>
          acc + (key === stat ? 0 : typeof val === "number" ? val : 0),
        0
      );
      const newTotalEV = totalEVWithoutCurrent + numericValue;
      if (newTotalEV < 509) setEVs({ ...EVs, [stat]: nextValue });
    }
  };

  const handleBlur = (stat: Stat, type: "IV" | "EV") => {
    if (type === "IV") {
      if (IVs[stat] === "") {
        setIVs({ ...IVs, [stat]: 0 });
      }
    } else {
      if (EVs[stat] === "") {
        setEVs({ ...EVs, [stat]: 0 });
      }
    }
  };

  const inputClassName = "border-2 border-white w-[clamp(3rem,6vw,8rem)] rounded-md";
  const customInput = (
    min: number,
    max: number,
    value: StatValue,
    stat: Stat,
    type: "IV" | "EV"
  ) => (
    <input
      className={inputClassName}
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => handleChange(e, stat, type)}
      onBlur={() => handleBlur(stat, type)}
    />
  );

  return (
    <div>
      <div>
        <Select onValueChange={setSelectedNature} value={selectedNature}>
          <SelectTrigger className="w-[180px] border-white border-2">
            <SelectValue placeholder="Nature" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Natures</SelectLabel>
              <SelectItem value="--">--</SelectItem>
              {nonNeutralNatures.map((n) => (
                <SelectItem key={n.name} value={n.name}>
                  <label className="font-semibold">{n.name}</label>{" "}
                  <label className="text-[#4AF594] font-semibold">
                    {n.increasedStat}
                  </label>{" "}
                  <label className="text-[#F91A34] font-semibold">
                    {n.decreasedStat}
                  </label>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-[auto_auto_auto] gap-2">
        <label className="font-semibold">STAT</label>
        <label className="font-semibold">IV (0-31)</label>
        <label className="font-semibold">EV (0-252)</label>
        <label>HP : </label>
        {customInput(0, 31, IVs.HP, "HP", "IV")}
        {customInput(0, 252, EVs.HP, "HP", "EV")}
        <label>Attack : </label>
        {customInput(0, 31, IVs.Atk, "Atk", "IV")}
        {customInput(0, 252, EVs.Atk, "Atk", "EV")}
        <label>Defense : </label>
        {customInput(0, 31, IVs.Def, "Def", "IV")}
        {customInput(0, 252, EVs.Def, "Def", "EV")}
        <label>Sp. Atk : </label>
        {customInput(0, 31, IVs["Sp. Atk"], "Sp. Atk", "IV")}
        {customInput(0, 252, EVs["Sp. Atk"], "Sp. Atk", "EV")}
        <label>Sp. Def : </label>
        {customInput(0, 31, IVs["Sp. Def"], "Sp. Def", "IV")}
        {customInput(0, 252, EVs["Sp. Def"], "Sp. Def", "EV")}
        <label>Speed : </label>
        {customInput(0, 31, IVs.Speed, "Speed", "IV")}
        {customInput(0, 252, EVs.Speed, "Speed", "EV")}
      </div>
    </div>
  );
};
