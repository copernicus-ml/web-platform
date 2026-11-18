import { readLastSearch } from "@/lib/storage";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { defaultStock } from ".";

export const Route = createFileRoute("/stocks")({
  beforeLoad: ({ location }) => {
    if (location.pathname.replaceAll("/", "") === "stocks") {
      let { symbol, window, group } = defaultStock;
      const lastSearch = readLastSearch();
      if (lastSearch) {
        symbol = lastSearch.symbol;
        window = lastSearch.window;
        group = lastSearch.group;
      }
      throw redirect({
        to: "/stocks/$symbol",
        params: { symbol },
        search: { window, group },
      });
    }
  },
  component: StocksLayout,
});

function StocksLayout() {
  return <Outlet />;
}
