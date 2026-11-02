import { marketRankScopes } from "@/apis";
import { addFlashToast } from "@/components/ui/FlashToast";
import { industryPctChangeQuery, stockPctChangeQuery } from "@/queries/stock";
import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";

const RankSearchSchema = z.object({
  scope: z.enum(marketRankScopes).catch("stockpct"),
});

export const Route = createFileRoute("/market/rank")({
  validateSearch: RankSearchSchema,
  loaderDeps: ({ search }) => ({ scope: search.scope }),
  component: RouteComponent,
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
      if (scope === "stockpct") {
        const stockRanks = await context.queryClient.query(stockPctChangeQuery(token));
        return { rank: stockRanks };
      } else {
        const industryRanks = await context.queryClient.query(
          industryPctChangeQuery(token),
        );
        return { rank: industryRanks };
      }
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

function RouteComponent() {
  return <div>Market rank page comming soon</div>;
}
