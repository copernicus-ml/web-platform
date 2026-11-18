import * as d3 from "d3";
import type { StockPrice } from "@/apis";
import { priceColors } from "@/lib/theme";
import { getYScale } from "@stocks/plot/interactions/d3-utils";
import Legend from "@/components/ui/Legend";
import { useTranslation } from "react-i18next";
import { priceElementIds, toggleVolumeGroup } from "./interactions/price-trend";

type VolumesProps = {
  prices: StockPrice[];
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
};

export default function Volumes({ prices, x, y }: VolumesProps) {
  const { t } = useTranslation("stocks");
  const volVals = prices.map((values) => values.volume);
  const yRange = y.range();
  const yVol = getYScale(volVals, yRange[0], yRange[0] + (yRange[1] - yRange[0]) / 2);
  if (!prices) return <></>;
  const isUp = prices.at(-1)!["close"] >= prices.at(-1)!["open"];
  return (
    <>
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
      <Legend
        legendId={priceElementIds.volumeLegend}
        valueId={priceElementIds.volumeLegendValue}
        index={0}
        label={t(`featureName.volume`)}
        color={isUp ? priceColors.up : priceColors.down}
        onMouseDown={() => toggleVolumeGroup()}
      />
    </>
  );
}
