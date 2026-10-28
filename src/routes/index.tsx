import type { DataWindowOpt, FeatureGroupOpt } from "@/apis";
import { readLastSearch } from "@/lib/storage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const defaultStock: {
  ticker: string;
  window: DataWindowOpt;
  group: FeatureGroupOpt;
} = {
  ticker: "AAPL",
  window: "60D",
  group: "pricemomentum",
};

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    let { ticker, window, group } = defaultStock;
    const lastVisited = readLastSearch();
    if (lastVisited !== undefined) {
      ticker = lastVisited.ticker;
      window = lastVisited.window;
      group = lastVisited.group;
    }
    throw redirect({
      to: "/stocks/$ticker",
      params: { ticker },
      search: { window, group },
    });
  },
});
