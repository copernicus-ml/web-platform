import { readLastSearch } from "@/lib/storage";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import { defaultStock } from ".";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stocks")({
  beforeLoad: ({ location }) => {
    if (location.pathname.replaceAll("/", "") === "stocks") {
      let { ticker, window, group } = defaultStock;
      const lastSearch = readLastSearch();
      if (lastSearch) {
        ticker = lastSearch.ticker;
        window = lastSearch.window;
        group = lastSearch.group;
      }
      throw redirect({
        to: "/stocks/$ticker",
        params: { ticker },
        search: { window, group },
      });
    }
  },
  component: StocksLayout,
});

function StocksLayout() {
  const isLoading = useRouterState({ select: (state) => state.isLoading });
  return (
    <div
      className={cn(
        "w-full flex-1 px-3 max-w-(--max-width) transition-opacity duration-100",
        isLoading ? "opacity-50" : "opacity-100",
      )}
    >
      <Outlet />
    </div>
  );
}
