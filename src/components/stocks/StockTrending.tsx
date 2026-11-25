import { stockPctChangeQuery } from "@/queries/stock";
import { queryClient } from "@/router";
import { useRouteContext } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { addFlashToast } from "@/components/ui/FlashToast";
import type { StockPctChange } from "@/apis";
import { cn, digitToPercent } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type StockTrendingProps = {
  currSymbol: string;
  selectStock: (symbol: string) => void;
};

export default function StockTrending({ currSymbol, selectStock }: StockTrendingProps) {
  const [dayRunnersList, setDayRunnersList] = useState<StockPctChange[]>([]);
  const { t } = useTranslation("stocks");

  const getToken = useRouteContext({
    from: "__root__",
    select: (context) => context.auth.getToken,
  });

  const getDayRunners = async () => {
    const token = await getToken();
    if (!token) return;
    try {
      const runners = await queryClient.query(stockPctChangeQuery(token));
      if (runners) {
        const slicedRunners = runners
          .sort((a, b) => b.pct1d - a.pct1d)
          .slice(0, Math.min(runners.length, 10));
        setDayRunnersList(slicedRunners);
      }
    } catch (error) {
      addFlashToast({
        title: "Failed to get stock day runners",
        description: String(error),
        type: "error",
        timeout: 3000,
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getDayRunners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="text-center text-sm py-1 border-b border-dashed border-frame bg-accent-100">
        {t("ui.trending")}
      </p>
      <div className="overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-accent-200 p-1 border-b border-dashed border-frame">
        {dayRunnersList.length > 0 &&
          dayRunnersList.map((runner) => (
            <button
              key={`dayrunner-${runner.symbol}`}
              className={cn(
                "flex w-full justify-between items-center text-sm py-1 px-2.5 hover:bg-accent-100 hover:cursor-pointer",
                currSymbol === runner.symbol && "bg-accent-200",
              )}
              onMouseDown={() => selectStock(runner.symbol)}
            >
              <div className="flex flex-col text-start">
                <p className="font-semibold">{runner.symbol}</p>
                <p className="text-xs text-accent-500">{runner.companyName}</p>
              </div>
              <p
                className={cn(
                  "font-semibold",
                  runner.pct1d >= 0 ? "text-price-up" : "text-price-down",
                )}
              >
                {digitToPercent(runner.pct1d)}
              </p>
            </button>
          ))}
      </div>
    </div>
  );
}
