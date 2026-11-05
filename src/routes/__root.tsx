import {
  Outlet,
  createRootRouteWithContext,
  redirect,
  useLocation,
  useRouterState,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

export type AppRouterContext = {
  queryClient: QueryClient;
  auth: {
    isSignedIn: boolean;
    getToken: () => Promise<string | null>;
  };
};

const publicPaths = new Set([
  "/signin",
  // /signup,
  // /forget-password
]);

export const Route = createRootRouteWithContext<AppRouterContext>()({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isSignedIn && !publicPaths.has(location.pathname)) {
      throw redirect({
        to: "/signin",
        search: { redirect: location.href },
        replace: true,
      });
    }
  },
  component: RootLayout,
});

function RootLayout() {
  const { pathname } = useLocation();
  const isLoading = useRouterState({ select: (state) => state.isLoading });
  if (publicPaths.has(pathname)) return <Outlet />;
  return (
    <div className="w-full h-full flex flex-col items-center gap-3 min-h-200 [&_div]:min-h-0 pb-3">
      <Header />
      <div
        className={cn(
          "w-full h-full flex-1 px-3 max-w-(--max-width) transition-opacity duration-100",
          isLoading ? "opacity-50" : "opacity-100",
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
