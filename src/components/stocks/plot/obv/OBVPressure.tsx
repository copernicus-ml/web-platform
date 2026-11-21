import YAxis from "@/components/ui/YAxis";
import { digitToPercent } from "@/lib/utils";
import {
  getFeatureValues,
  getLineID,
  getPaths,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";
import { obvIDPrefix, obvPressureFeatures } from "@stocks/plot/interactions/obv";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig, priceColors, svgConfig } from "@/lib/theme";
import ShadeRegion from "@/components/ui/ShadeRegion";

export default function OBVPressure({ features, width, height, x }: SubplotProps<"obv">) {
  const { marginTop, marginBottom } = plotSizeConfig;
  const { strokeWidth, shadeOpacity } = svgConfig;
  const values = getFeatureValues<"obv">(features, obvPressureFeatures);
  const y = getYScale(values, height - marginBottom, marginTop);
  const paths = getPaths<"obv">(features, obvPressureFeatures, x, y);
  return (
    <>
      <YAxis
        y={y}
        width={width}
        labelFormatter={(value: number) => digitToPercent(value, 0)}
      />
      <ShadeRegion
        upper={0}
        lower={0}
        x={x}
        y={y}
        upperColor={priceColors.up}
        lowerColor={priceColors.down}
        opacity={shadeOpacity - 0.05}
        center={0}
      />
      {obvPressureFeatures.map((featureName, i) => (
        <g key={getLineID(obvIDPrefix, featureName)}>
          <path
            id={getLineID(obvIDPrefix, featureName)}
            d={paths[featureName]}
            fill="none"
            stroke={colorPalette[i]}
            strokeWidth={strokeWidth}
          />
        </g>
      ))}
    </>
  );
}
