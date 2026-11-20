import * as d3 from "d3";
import type { StockPrice } from "@/apis";
import { priceColors, legendConfig } from "@/lib/theme";
import { priceElementIds } from "@stocks/plot/interactions/price-trend";
import DateLine from "@/components/ui/DateLine";
import type { PriceChartType } from "@/components/stocks/shared";

type StockDataIndicatorsProps = {
  prices: StockPrice[];
  chartType: PriceChartType;
  width: number;
  height: number;
  y: d3.ScaleLinear<number, number>;
};

export default function StockDataIndicators({
  prices,
  chartType,
  height,
  y,
}: StockDataIndicatorsProps) {
  const isUp = (prices.at(0)?.close ?? 0) <= (prices.at(-1)?.close ?? 0);
  const lastPrice = prices.at(-1);
  return (
    <g>
      <g id={priceElementIds.indicatorGroup} opacity={0}>
        <DateLine
          height={height}
          dateGroupId={priceElementIds.indicatorDateGroup}
          dayId={priceElementIds.indicatorDay}
          monthId={priceElementIds.indicatorMonth}
        />

        {chartType === "line" && (
          <circle
            id={priceElementIds.indicatorPoint}
            cx={0}
            cy={lastPrice ? y(lastPrice["close"]) : 0}
            r={5}
            strokeWidth={2}
            fill={isUp ? priceColors.up : priceColors.down}
            opacity={chartType === "line" ? 1 : 0}
            className="stroke-background"
          />
        )}
      </g>
      <g
        id={priceElementIds.valuesCurrGroup}
        transform={`translate(0, ${y(prices.at(-1)?.close || 0)})`}
      >
        <g transform={`translate(-15, 0)`}>
          <rect
            id={priceElementIds.valuesCurrRect}
            x={4}
            y={-10}
            width={48}
            height={20}
            rx={legendConfig.rectCorner}
            fill={isUp ? priceColors.up : priceColors.down}
          />
          <text
            id={priceElementIds.valuesCurrVal}
            x={28}
            y={0}
            dy={"0.33em"}
            textAnchor="middle"
            fontSize={12}
            className="fill-background"
          >
            {prices.at(-1)?.close}
          </text>
        </g>
      </g>
    </g>
  );
}
