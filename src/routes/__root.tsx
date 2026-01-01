import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

const RootLayout = () => {
  const navigate = useNavigate()
  
  return(
  <>
    <div className="p-2 flex gap-2">
      <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
      <Button onClick={() => navigate({ to: '/about' })}>Go to About</Button>
      <div className="flex-grow" />{/* spacer */}
      <div>ciaooooo</div>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)}

export const Route = createRootRoute({ component: RootLayout })