import * as d3 from "d3";
import type { StockPrice } from "@/apis";
import { priceColors } from "@/lib/theme";
import { getYScale } from "@stocks/plot/interactions/d3-utils";
import { priceElementIds } from "@stocks/plot/interactions/price-trend";

type VolumesProps = {
  prices: StockPrice[];
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
};

export default function Volumes({ prices, x, y }: VolumesProps) {
  const volVals = prices.map((values) => values.volume);
  const yRange = y.range();
  const yVol = getYScale(volVals, yRange[0], yRange[0] + (yRange[1] - yRange[0]) / 2);
  if (!prices) return <></>;
  return (
    <g id={priceElementIds.volumeBarGroup}>
      {prices.map(({ date, volume, close, open }) => (
        <rect
          key={`volume-${date}`}
          x={x(date) ?? 0}
          y={yVol(volume)}
          width={x.bandwidth()}
          height={yVol.range()[0] - yVol(volume)}
          fill={close >= open ? priceColors.up : priceColors.down}
          opacity={0.4}
        />
      ))}
    </g>
  );
}
