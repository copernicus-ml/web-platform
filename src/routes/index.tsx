import type { DataWindowOpt, FeatureGroupOpt } from "@/apis";
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
    const { ticker, window, group } = defaultStock;
    throw redirect({
      to: "/stocks/$ticker",
      params: { ticker },
      search: { window, group },
    });
  },
});
