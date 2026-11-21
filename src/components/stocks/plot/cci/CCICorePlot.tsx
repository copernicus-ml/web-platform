import YAxis from "@/components/ui/YAxis";
import { cciCoreFeatures, cciIDPrefix } from "@stocks/plot/interactions/cci";
import {
  getFeatureValues,
  getLineID,
  getPaths,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig, priceColors, svgConfig } from "@/lib/theme";
import ShadeRegion from "@/components/ui/ShadeRegion";

export default function CCICorePlot({ features, x, width, height }: SubplotProps<"cci">) {
  const { marginBottom, marginTop } = plotSizeConfig;
  const { strokeWidth } = svgConfig;
  const values = getFeatureValues<"cci">(features, cciCoreFeatures);
  const y = getYScale(values, height - marginBottom, marginTop);
  const paths = getPaths<"cci">(features, cciCoreFeatures, x, y);
  return (
    <>
      <YAxis y={y} width={width} />
      <ShadeRegion
        upper={100}
        lower={-100}
        x={x}
        y={y}
        upperColor={priceColors.down}
        lowerColor={priceColors.up}
        center={0}
      />
      {cciCoreFeatures.map((featureName, i) => (
        <path
          key={getLineID(cciIDPrefix, featureName)}
          id={getLineID(cciIDPrefix, featureName)}
          d={paths[featureName]}
          fill="none"
          stroke={colorPalette[i]}
          strokeWidth={strokeWidth}
        />
      ))}
    </>
  );
}
