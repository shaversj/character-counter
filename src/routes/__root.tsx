import { TanstackDevtools } from "@tanstack/react-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
