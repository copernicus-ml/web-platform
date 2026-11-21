import YAxis from "@/components/ui/YAxis";
import {
  getCircleID,
  getCirclesGroupID,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";
import {
  volatilityIDPrefix,
  volatilityRankFeature,
} from "@stocks/plot/interactions/volatility";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig } from "@/lib/theme";

export default function VolatilityRank({
  features,
  width,
  height,
  x,
}: SubplotProps<"volatility">) {
  const { marginBottom, marginTop } = plotSizeConfig;
  const values = features.map((feature) => feature[volatilityRankFeature]);
  const y = getYScale(values, height - marginBottom, marginTop);
  return (
    <>
      <YAxis y={y} width={width} />
      <g>
        <g id={getCirclesGroupID(volatilityRankFeature)}>
          {features.map((feature) => (
            <circle
              key={getCircleID(volatilityIDPrefix, volatilityRankFeature + feature.date)}
              cx={(x(feature.date) ?? 0) + x.bandwidth() / 2}
              cy={y(feature[volatilityRankFeature])}
              r={3}
              strokeWidth={2}
              stroke={colorPalette[0]}
              className="fill-background"
            />
          ))}
        </g>
      </g>
    </>
  );
}
