import { readLastSearch } from "@/lib/storage";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { defaultStock } from ".";

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
  return <Outlet />;
}
