import { useNavigate } from "@tanstack/react-router";
import { ImageButton } from "@components/image-button";

export const MainMenu = () => {
  const navigate = useNavigate();
  {/* <NavigationMenuLink onClick={() => navigate({ to: "/" })}>Home</NavigationMenuLink> */}
  return (
    <div className="flex flex-row flex-wrap w-full gap-2 p-2 main-menu-bg">
      <ImageButton
        background="/images/bg-button.png"
        onClick={() => console.log("Menu clicked")}
      />
      <ImageButton
        background="/images/bg-button.png"
        onClick={() => navigate({ to: "/" })}
        text="Home"
      />

      {/* profile button */}
      <ImageButton
        background="/images/bg-button.png"
        onClick={() => console.log("Profile clicked")}
        className="ml-auto"
      />
    </div>
  );
};


