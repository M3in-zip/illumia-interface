import { useNavigate } from "@tanstack/react-router";
import { ImageButton } from "@components/image-button";
import { useSidebarStore } from "@/stores/sidebar-store";

export const MainMenu = () => {
  const navigate = useNavigate();
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  return (
    <div className="w-full bg-[#aba59d]">
      <div className="flex flex-row flex-wrap w-full max-w-[200rem] mx-auto p-[clamp(0.5rem,2vw,1rem)] gap-[clamp(0.25rem,1.5vw,0.75rem)]">
        <ImageButton
          background="/images/bg-grass.png"
          onClick={toggleSidebar}
          icon="fa-solid fa-bars"
        />
        <ImageButton
          background="/images/bg-grass.png"
          onClick={() => navigate({ to: "/" })}
          text="Home"
          icon="fa-solid fa-house"
        />
        <ImageButton
          background="/images/bg-grass.png"
          onClick={() => navigate({ to: "/calculator" })}
          text="Calculator"
          icon="fa-solid fa-calculator"
        />
        <ImageButton
          background="/images/bg-grass.png"
          onClick={() => navigate({ to: "/leaderboard" })}
          text="Leaderboard"
          icon="fa-solid fa-trophy"
        />

        {/* profilg-button */}
        <ImageButton
          background="/images/bg-grass.png"
          onClick={() => console.log("Profile clicked")}
          className="ml-auto"
          icon="fa-solid fa-user"
        />
      </div>
    </div>
  );
};
