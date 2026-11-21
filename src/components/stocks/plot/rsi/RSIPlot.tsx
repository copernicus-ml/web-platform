import YAxis from "@/components/ui/YAxis";
import {
  getFeatureValues,
  getLineID,
  getPaths,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";
import { rsiFeatures, rsiIDPrefix } from "@stocks/plot/interactions/rsi";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig, priceColors, svgConfig } from "@/lib/theme";
import ShadeRegion from "@/components/ui/ShadeRegion";

export default function RSIPlot({ features, x, width, height }: SubplotProps<"rsi">) {
  const { strokeWidth } = svgConfig;
  const { marginTop, marginBottom } = plotSizeConfig;

  const values = getFeatureValues<"rsi">(features, rsiFeatures);
  const y = getYScale(values, height - marginBottom, marginTop);
  const paths = getPaths<"rsi">(features, rsiFeatures, x, y);
  return (
    <>
      <YAxis y={y} width={width} />
      <ShadeRegion
        x={x}
        y={y}
        upper={70}
        lower={30}
        center={50}
        upperColor={priceColors.down}
        lowerColor={priceColors.up}
      />
      {rsiFeatures.map((featureName, i) => (
        <path
          key={getLineID(rsiIDPrefix, featureName)}
          id={getLineID(rsiIDPrefix, featureName)}
          d={paths[featureName]}
          fill="none"
          stroke={colorPalette[i]}
          strokeWidth={strokeWidth}
        />
      ))}
    </>
  );
}
