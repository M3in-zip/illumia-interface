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

export type Stat = "HP" | "Atk" | "Def" | "Sp. Atk" | "Sp. Def" | "Speed";
export type StatValue = number | "";

interface IVEVProps {
  changeIVs: (ivs: Record<Stat, StatValue>) => void;
  changeEVs: (evs: Record<Stat, StatValue>) => void;
  IVs: Record<Stat, StatValue>;
  EVs: Record<Stat, StatValue>;
  onNatureChange: (nature: string) => void;
  onBlur?: () => void;
}

export const PokemonStats = ({
  changeIVs,
  changeEVs,
  IVs,
  EVs,
  onNatureChange,
}: IVEVProps) => {
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
      changeIVs({ ...IVs, [stat]: nextValue });
    } else {
      if (numericValue > 252) return;
      const totalEVWithoutCurrent = Object.entries(EVs).reduce(
        (acc, [key, val]) =>
          acc + (key === stat ? 0 : typeof val === "number" ? val : 0),
        0
      );
      const newTotalEV = totalEVWithoutCurrent + numericValue;
      if (newTotalEV < 509) changeEVs({ ...EVs, [stat]: nextValue });
    }
  };

  const handleBlur = (stat: Stat, type: "IV" | "EV") => {
    if (type === "IV") {
      if (IVs[stat] === "") {
        changeIVs({ ...IVs, [stat]: 0 });
      }
    } else {
      if (EVs[stat] === "") {
        changeEVs({ ...EVs, [stat]: 0 });
      }
    }
  };

  const inputClassName = "border-2 w-[clamp(3rem,6vw,8rem)] rounded-md";
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
        <Select onValueChange={onNatureChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nature" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Natures</SelectLabel>
              <SelectItem value="--">--</SelectItem>
              {nonNeutralNatures.map((n) => (
                <SelectItem key={n.name} value={n.name}>
                  <label className="font-semibold">{n.name}</label>{" "}
                  <label className="text-[#A9FF1F] font-semibold">
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
