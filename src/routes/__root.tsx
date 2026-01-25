import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { MainMenu } from "@/components/main-menu/main-menu";
import { useSidebarStore } from "@stores/sidebar-store";
import { useThemeStore } from "@stores/theme-store";
import { useEffect } from "react";

const RootLayout = () => {
  const visible = useSidebarStore((state) => state.visible);
  const detectTheme = useThemeStore((state) => state.detectTheme);
  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    detectTheme();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-auto">
      <div className="flex flex-col flex-1 w-full min-w-[260px] min-h-screen">
        <MainMenu />
        <hr />
        <main className={`flex-1 ${theme === "dark" ? "bg-slate-500" : "bg-slate-300"} w-full overflow-auto`}>
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
