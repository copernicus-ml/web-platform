import * as d3 from "d3";
import type { StockPrice } from "@/apis";
import { colorPalette } from "@/lib/theme";
import { getBarGroupID, getYScale } from "@stocks/plot/interactions/d3-utils";
import { marketIDPrefix } from "@stocks/plot/interactions/market-activity";

type TurnoverBarsProps = {
  prices: StockPrice[];
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
};

export default function TurnoverBars({ prices, x, y }: TurnoverBarsProps) {
  const values = prices.map((price) => price.turnover);
  const yRange = y.range();
  const [yEnd, yStart] = [yRange[0], yRange[0] + (yRange[1] - yRange[0]) / 2];
  const subY = getYScale(values, yEnd, yStart);
  return (
    <g id={getBarGroupID(marketIDPrefix, "turnover")}>
      {prices.map((values) => (
        <rect
          key={`market-turnover-${values.date}`}
          x={x(values.date)}
          y={subY(values.turnover)}
          width={x.bandwidth()}
          height={subY.range()[0] - subY(values.turnover)}
          fill={colorPalette[2]}
          opacity={0.6}
        />
      ))}
    </g>
  );
}
