interface stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface SpriteStatsProps {
  sprite: string;
  stats: stat[];
}

export const SpriteStats = ({ sprite, stats }: SpriteStatsProps) => {
  const statNameMap: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return (
    <div className="flex flex-row items-center">
      <img
        src={sprite}
        alt="Pokemon sprite"
        className="h-[clamp(5rem,16vw,15rem)] pixel-art"
      />
      <div>
        {stats.map((stat) => (
          <div key={stat.stat.name}>
            <span>
              {statNameMap[stat.stat.name] || stat.stat.name}: {stat.base_stat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
