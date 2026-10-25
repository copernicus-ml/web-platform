import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
  return (
    <div className="w-full h-full flex flex-col items-center gap-3 min-h-200 [&_div]:min-h-0">
      <Header />
      <div className="w-full flex-1 px-3 max-w-(--max-width)">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
