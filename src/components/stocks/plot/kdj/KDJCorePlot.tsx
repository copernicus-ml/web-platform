import YAxis from "@/components/ui/YAxis";
import {
  getFeatureValues,
  getLineID,
  getPaths,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";
import { kdjCoreFeatures, kdjIDPrefix } from "@stocks/plot/interactions/kdj";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig, priceColors, svgConfig } from "@/lib/theme";
import ShadeRegion from "@/components/ui/ShadeRegion";

export default function KDJCorePlot({ features, width, height, x }: SubplotProps<"kdj">) {
  const { marginTop, marginBottom } = plotSizeConfig;
  const { strokeWidth } = svgConfig;
  const values = getFeatureValues<"kdj">(features, kdjCoreFeatures);
  const y = getYScale(values, height - marginBottom, marginTop);
  const paths = getPaths<"kdj">(features, kdjCoreFeatures, x, y);

  return (
    <>
      <YAxis y={y} width={width} />
      <ShadeRegion
        x={x}
        y={y}
        upper={80}
        lower={20}
        center={50}
        upperColor={priceColors.down}
        lowerColor={priceColors.up}
      />
      {kdjCoreFeatures.map((featureName, i) => (
        <path
          key={getLineID(kdjIDPrefix, featureName)}
          id={getLineID(kdjIDPrefix, featureName)}
          d={paths[featureName]}
          fill="none"
          stroke={colorPalette[i]}
          strokeWidth={strokeWidth}
        />
      ))}
    </>
  );
}
