import { usePokemonStore } from "@/stores/pokemonStore";
import { useEffect, useState, useMemo, Fragment } from "react";
import { DropDown } from "../drop-down";
import type { pokemonNature } from "@/stores/pokemonStore";

export type Stat = "HP" | "Atk" | "Def" | "Sp. Atk" | "Sp. Def" | "Speed";
const STAT_NAMES = ["HP", "Atk", "Def", "Sp. Atk", "Sp. Def", "Speed"] as const;
export type StatValue = number | "";

interface IVEVProps {
  baseStats: number[];
  onChange: (stats: number[]) => void;
}

export const PokemonStats = ({ baseStats, onChange }: IVEVProps) => {
  const [selectedNature, setSelectedNature] = useState<string>("--");
  const createStatObject = <T,>(initialValue: T) => {
    return STAT_NAMES.reduce(
      (acc, stat) => {
        acc[stat] = initialValue;
        return acc;
      },
      {} as Record<Stat, T>,
    );
  };
  const [IVs, setIVs] = useState<Record<Stat, StatValue>>(
    createStatObject<StatValue>(31),
  );
  const [EVs, setEVs] = useState<Record<Stat, StatValue>>(
    createStatObject<StatValue>(0),
  );
  const [level, setLevel] = useState<string | number>(50);
  const [statChanges, setStatChanges] = useState<Record<Stat, string | number>>(
    createStatObject<string | number>(0),
  );

  const nonNeutralNatures: pokemonNature[] = usePokemonStore((state) =>
    state.getNonNeutralNatures(),
  );
  const baseStatsObj: Record<Stat, number> = {
    HP: baseStats[0],
    Atk: baseStats[1],
    Def: baseStats[2],
    "Sp. Atk": baseStats[3],
    "Sp. Def": baseStats[4],
    Speed: baseStats[5],
  };
  const selectedNatureObj: pokemonNature | undefined = nonNeutralNatures.find(
    (nature) => nature.name === selectedNature,
  );

  const calculateStat = (stat: Stat) =>
    Math.floor(
      Math.floor(
        ((2 * baseStatsObj[stat] +
          (IVs[stat] ? (IVs[stat] as number) : 0) +
          (EVs[stat] ? (EVs[stat] as number) : 0) / 4) *
          (level as number)) /
          100 +
          5,
      ) *
        (selectedNatureObj?.increasedStat == stat
          ? 1.1
          : selectedNatureObj?.decreasedStat == stat
            ? 0.9
            : 1),
    );

  const finalStats = useMemo<Record<Stat, number>>(() => {
    return {
      HP: Math.floor(
        ((2 * baseStatsObj["HP"] +
          (IVs["HP"] ? (IVs["HP"] as number) : 0) +
          (EVs["HP"] ? (EVs["HP"] as number) : 0) / 4) *
          (level as number)) /
          100 +
          (level as number) +
          10,
      ),
      Atk: calculateStat("Atk"),
      Def: calculateStat("Def"),
      "Sp. Atk": calculateStat("Sp. Atk"),
      "Sp. Def": calculateStat("Sp. Def"),
      Speed: calculateStat("Speed"),
    };
  }, [baseStats, IVs, EVs, level, selectedNatureObj]);

  useEffect(() => {
    onChange([
      finalStats["HP"],
      finalStats["Atk"],
      finalStats["Def"],
      finalStats["Sp. Atk"],
      finalStats["Sp. Def"],
      finalStats["Speed"],
    ]);
  }, [finalStats]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stat: Stat,
    type: "IV" | "EV",
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
        0,
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

  const inputClassName = "border-2 border-white rounded-md";
  const customInput = (
    min: number,
    max: number,
    value: StatValue,
    stat: Stat,
    type: "IV" | "EV",
    step?: number,
  ) => (
    <input
      className={inputClassName}
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => handleChange(e, stat, type)}
      onBlur={() => handleBlur(stat, type)}
      step={step || 1}
    />
  );

  const statChangesDropdown = (stat: Stat) => {
    return (
      <DropDown
        removeLens
        value={statChanges[stat]}
        defaultValue={0}
        onSelect={(val) =>
          setStatChanges((prev) => ({
            ...prev,
            [stat]: val,
          }))
        }
        dataSource={Array.from({ length: 13 }, (_, i) => {
          const v = i - 6;
          return { value: v, item: <span>{v}</span> };
        })}
      />
    );
  };

  return (
    <div className="p-2">
      <div className="flex flex-row items-center gap-2 mb-2">
        <span className="font-semibold whitespace-nowrap">NATURE : </span>
        <DropDown
          onSelect={setSelectedNature as (value: string | number) => void}
          value={selectedNature}
          dataSource={[
            { value: "--", item: <span className="font-semibold">--</span> },
            ...nonNeutralNatures.map((n) => ({
              value: n.name,
              item: (
                <span className="flex flex-row gap-2">
                  <span className="font-semibold">{n.name}</span>
                  <span className="text-[#4AF594] font-semibold">
                    {n.increasedStat}
                  </span>
                  <span className="text-[#F91A34] font-semibold">
                    {n.decreasedStat}
                  </span>
                </span>
              ),
            })),
          ]}
        />
        <span className="font-semibold whitespace-nowrap">LEVEL : </span>
        <DropDown
          onSelect={setLevel}
          value={level}
          dataSource={[
            { value: 50, item: <span>50</span> },
            { value: 100, item: <span>100</span> },
          ]}
        />
      </div>
      <div className="grid grid-cols-5 gap-2 items-center justify-items-center">
        <span className="font-semibold justify-self-start uppercase text-xs">
          Stat
        </span>
        <span className="font-semibold justify-self-start uppercase text-xs">
          Value
        </span>
        <span className="font-semibold uppercase text-xs">IV</span>
        <span className="font-semibold uppercase text-xs">EV</span>
        <span className="font-semibold uppercase text-xs">Change</span>
        {STAT_NAMES.map((stat) => (
          <Fragment key={stat}>
            {/* stat name */}
            <span className="whitespace-nowrap justify-self-start font-medium">
              {stat} :
            </span>

            {/* final-stat */}
            <span className="font-semibold text-lg justify-self-start">
              {finalStats[stat]}
            </span>

            {/* Input IV */}
            <div className="w-full max-w-[80px]">
              {customInput(0, 31, IVs[stat], stat, "IV")}
            </div>

            {/* Input EV */}
            <div className="w-full max-w-[80px]">
              {customInput(0, 252, EVs[stat], stat, "EV", 4)}
            </div>
            {/* Stat Change DropDown */}
            <div className="max-w-[80px] justify-self-center">
              {stat !== "HP" && statChangesDropdown(stat)}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
