import { dataWindows, FeatureGroups } from "@/apis";
import StockInfo from "@/components/stocks/StockInfo";
import {
  stockFeatureQuery,
  stockInfoQuery,
  stockListQuery,
  stockPriceQuery,
} from "@/queries/stock";
import { createFileRoute, getRouteApi, redirect } from "@tanstack/react-router";
import { z } from "zod";
import PriceSection from "@/components/stocks/PriceSection";
import FeaturesSection from "@/components/stocks/FeaturesSection";
import FeatureGroupSidebar from "@/components/stocks/FeatureGroupSidebar";
import { addSearchHistory } from "@/lib/storage";
import { addFlashToast } from "@/components/ui/FlashToast";

const searchSchema = z.object({
  window: z.enum(dataWindows).catch("60D"),
  group: z.enum(FeatureGroups).catch("pricemomentum"),
});

export type StockSearchSchema = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/stocks/$symbol")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({
    window: search.window,
    group: search.group,
  }),
  loader: async ({ context, params, deps, location }) => {
    const token = await context.auth.getToken();
    if (!token) {
      throw redirect({
        to: "/signin",
        search: { redirect: location.href },
        replace: true,
      });
    }
    try {
      const [info, list, prices, features] = await Promise.all([
        context.queryClient.query(stockInfoQuery(params.symbol, token)),
        context.queryClient.query(stockListQuery(token)),
        context.queryClient.query(stockPriceQuery(params.symbol, deps.window, token)),
        context.queryClient.query(
          stockFeatureQuery(params.symbol, deps.window, deps.group, token),
        ),
      ]);
      addSearchHistory(params.symbol, deps.window, deps.group);
      return { info, list, prices, features };
    } catch (error) {
      addFlashToast({
        title: "Failed to get data",
        description: String(error),
        type: "error",
        timeout: 3000,
      });
      throw redirect({ to: "/stocks" });
    }
  },
  component: StocksDashboard,
});

export const stockRouteAPI = getRouteApi("/stocks/$symbol");

function StocksDashboard() {
  return (
    <div className="w-full h-full flex flex-col justify-center divide-y divide-frame divide-dashed">
      <StockInfo />
      <div className="flex-1 flex divide-x divide-frame divide-dashed">
        {/* <div>Hello</div> */}
        <div className="w-full flex-1 flex flex-col min-w-0 divide-y divide-frame divide-dashed pb-2">
          <PriceSection className="flex flex-col flex-3" />
          <FeaturesSection className="flex flex-col flex-2" />
        </div>
        <FeatureGroupSidebar />
      </div>
    </div>
  );
}
