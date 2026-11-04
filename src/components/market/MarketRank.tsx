import { marketrankRouteAPI } from "@/routes/market.rank";
import MarketTable from "./MarketTable";

export default function MarketRank() {
  const rank = marketrankRouteAPI.useLoaderData({
    select: (loaderData) => (loaderData ? loaderData.rank : undefined),
  });
  const scope = marketrankRouteAPI.useSearch({ select: (search) => search.scope });
  let headers: string[] = [];
  if (scope === "stockpct") {
    headers = ["ticker", "subIndustry", "pct1d", "pct5d", "pct10d", "pct20d", "pct60d"];
  } else if (scope === "industrypct") {
    headers = ["subIndustry", "pct1d", "pct5d", "pct10d", "pct20d", "pct60d"];
  }
  if (rank === undefined) {
    return <></>;
  }
  const sortedRank = rank.sort((a, b) => b.pct1d - a.pct1d);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full rounded-sm border border-gray-300 overflow-y-auto  scrollbar-thin">
        <MarketTable
          headers={headers}
          data={sortedRank}
          widerColumns={["subIndustry"]}
          className="w-full flex-1 max-h-full"
        />
      </div>
    </div>
  );
}
