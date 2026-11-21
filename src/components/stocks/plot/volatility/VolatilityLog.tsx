import YAxis from "@/components/ui/YAxis";
import { getLineID, getPaths, getYScale } from "@stocks/plot/interactions/d3-utils";
import {
  volatilityIDPrefix,
  volatilityLogFeature,
} from "@stocks/plot/interactions/volatility";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig, svgConfig } from "@/lib/theme";

export default function VolatilityLog({
  features,
  width,
  height,
  x,
}: SubplotProps<"volatility">) {
  const { strokeWidth } = svgConfig;
  const { marginBottom, marginTop } = plotSizeConfig;
  const values = features.map((feature) => feature[volatilityLogFeature]);
  const y = getYScale(values, height - marginBottom, marginTop);
  const paths = getPaths<"volatility">(features, [volatilityLogFeature], x, y);

  return (
    <>
      <YAxis y={y} width={width} />
      {Object.entries(paths).map(([featureName, value], i) => (
        <g key={getLineID(volatilityIDPrefix, featureName)}>
          <path
            id={getLineID(volatilityIDPrefix, featureName)}
            d={value}
            fill="none"
            stroke={colorPalette[i]}
            strokeWidth={strokeWidth}
          />
        </g>
      ))}
    </>
  );
}
