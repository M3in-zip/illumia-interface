import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { MainMenu } from "@/components/main-menu/main-menu";
import { SidebarMenu } from "@/components/sidebar-menu";
import { useSidebarStore } from "@stores/sidebar-store";

const RootLayout = () => {
  const visible = useSidebarStore((state) => state.visible);

  return (
    <div>
      <div className="flex flex-col flex-1 w-full min-w-[360px]">
        <MainMenu />
        <hr />
        <main className="flex-1 bg-[#aba59d]">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
