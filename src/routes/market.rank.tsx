import { marketRankScopes, type IndustryPctChange, type StockPctChange } from "@/apis";
import MarketRank from "@/components/market/MarketRank";
import { addFlashToast } from "@/components/ui/FlashToast";
import { industryPctChangeQuery, stockPctChangeQuery } from "@/queries/stock";
import { createFileRoute, getRouteApi, redirect } from "@tanstack/react-router";
import z from "zod";

const RankSearchSchema = z.object({
  scope: z.enum(marketRankScopes).catch("stockpct"),
});

export const Route = createFileRoute("/market/rank")({
  validateSearch: RankSearchSchema,
  loaderDeps: ({ search }) => ({ scope: search.scope }),
  component: MarketRankDashboard,
  loader: async ({ context, deps }) => {
    const token = await context.auth.getToken();
    if (!token) {
      throw redirect({
        to: "/signin",
        search: { redirect: location.href },
        replace: true,
      });
    }
    try {
      const scope = deps.scope;
      let rank: StockPctChange[] | IndustryPctChange[] | undefined = undefined;
      if (scope === "stockpct") {
        const stockRanks = await context.queryClient.query(stockPctChangeQuery(token));
        rank = stockRanks;
      } else {
        const industryRanks = await context.queryClient.query(
          industryPctChangeQuery(token),
        );
        rank = industryRanks;
      }
      return { rank };
    } catch (error) {
      addFlashToast({
        title: "Failed to get data",
        description: String(error),
        type: "error",
        timeout: 3000,
      });
    }
  },
});

export const marketrankRouteAPI = getRouteApi("/market/rank");

function MarketRankDashboard() {
  return <MarketRank />;
}
