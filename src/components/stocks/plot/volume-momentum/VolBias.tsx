import { vmIDPrefix, volBiasFeatures } from "@stocks/plot/interactions/volume-momentum";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig, svgConfig } from "@/lib/theme";
import YAxis from "@/components/ui/YAxis";
import {
  getFeatureValues,
  getLineID,
  getPaths,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";
import { digitToPercent } from "@/lib/utils";

export default function VolBias({
  features,
  width,
  height,
  x,
}: SubplotProps<"volumemomentum">) {
  const { marginTop, marginBottom } = plotSizeConfig;
  const { strokeWidth, markStrokeDasharray, markStrokeWidth } = svgConfig;
  const values = getFeatureValues<"volumemomentum">(features, volBiasFeatures);
  const y = getYScale(values, height - marginBottom, marginTop);
  const paths = getPaths<"volumemomentum">(features, volBiasFeatures, x, y);

  return (
    <>
      <YAxis
        y={y}
        width={width}
        labelFormatter={(val: number) => digitToPercent(val, 0)}
      />
      {volBiasFeatures.map((featureName, i) => (
        <path
          key={getLineID(vmIDPrefix, featureName)}
          id={getLineID(vmIDPrefix, featureName)}
          d={paths[featureName]}
          fill="none"
          stroke={colorPalette[i]}
          strokeWidth={strokeWidth}
        />
      ))}
      <line
        x1={x.range()[0]}
        x2={x.range()[1]}
        y1={y(0)}
        y2={y(0)}
        className="stroke-mark"
        strokeWidth={markStrokeWidth}
        strokeDasharray={markStrokeDasharray}
      />
    </>
  );
}
