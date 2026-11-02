import { marketRankScopes } from "@/apis";
import MainLayout from "@/components/MainLayout";
import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/market")({
  beforeLoad: () => {
    if (location.pathname.replaceAll("/", "") === "market") {
      throw redirect({
        to: "/market/rank",
        search: { scope: marketRankScopes[0] },
      });
    }
  },
  component: MarketLayout,
});

function MarketLayout() {
  const isLoading = useRouterState({ select: (state) => state.isLoading });
  return (
    <MainLayout>
      <div
        className={cn(
          "w-full flex-1 px-3 max-w-(--max-width) transition-opacity duration-100",
          isLoading ? "opacity-50" : "opacity-100",
        )}
      >
        <Outlet />
      </div>
    </MainLayout>
  );
}
