import type { DataWindowOpt, FeatureGroupOpt } from "@/apis";
import { readLastSearch } from "@/lib/storage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const defaultStock: {
  symbol: string;
  window: DataWindowOpt;
  group: FeatureGroupOpt;
} = {
  symbol: "AAPL",
  window: "60D",
  group: "pricemomentum",
};

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    let { symbol, window, group } = defaultStock;
    const lastVisited = readLastSearch();
    if (lastVisited !== undefined) {
      symbol = lastVisited.symbol;
      window = lastVisited.window;
      group = lastVisited.group;
    }
    throw redirect({
      to: "/stocks/$symbol",
      params: { symbol },
      search: { window, group },
    });
  },
});
