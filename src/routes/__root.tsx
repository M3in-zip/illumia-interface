import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { MainMenu } from '@/components/main-menu/main-menu'

const RootLayout = () => {
  
  return(
  <div className="flex flex-col min-h-screen">
    <MainMenu />
    <hr />
    <main className="flex-1 bg-[url('/images/main-menu-bg.png')] bg-cover bg-center">
      <Outlet />
    </main>
    <TanStackRouterDevtools />
  </div>
)}

export const Route = createRootRoute({ component: RootLayout })