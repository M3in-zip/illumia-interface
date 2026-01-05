import { useNavigate } from "@tanstack/react-router";
import { ImageButton } from "@components/image-button";
import { HoverMenu } from "../hover-menu";

export const MainMenu = () => {
  const navigate = useNavigate();
  {/* <NavigationMenuLink onClick={() => navigate({ to: "/" })}>Home</NavigationMenuLink> */}
  return (
    <div className="flex flex-row flex-wrap w-full gap-2 p-2 main-menu-bg">
      <ImageButton
        buttonImgSrc="/images/sidebar-icon.png"
        onClick={() => console.log("Menu clicked")}
      />
      <ImageButton
        buttonImgSrc="/images/home-icon.png"
        onClick={() => navigate({ to: "/" })}
      />
      
      <HoverMenu onClick={() => navigate({ to: "/about" })}/>

      {/* profile button */}
      <ImageButton
        buttonImgSrc="/images/profile-icon.png"
        onClick={() => console.log("Profile clicked")}
        className="ml-auto"
      />
    </div>
  );
};


