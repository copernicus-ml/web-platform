import { useTranslation } from "react-i18next";
import type { StockPrice } from "@/apis";
import { colorPalette } from "@/lib/theme";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import { marketIDPrefix, toggleFeature } from "@stocks/plot/interactions/market-activity";
import PlotLegend from "@/components/ui/PlotLegend";

type TurnoverLegendProps = {
  prices: StockPrice[];
};

export default function TurnoverLegend({ prices }: TurnoverLegendProps) {
  const { t } = useTranslation("stocks");
  return (
    <PlotLegend
      legendId={getLegendID(marketIDPrefix, "turnover")}
      valueId={getLegendValueID(marketIDPrefix, "turnover")}
      label={t("featureName.turnover")}
      index={0}
      value={prices.at(-1)?.turnover.toFixed(2) || "0.0"}
      color={colorPalette[2]}
      onClick={() => toggleFeature("turnover")}
    />
  );
}
