import YAxis from "@/components/ui/YAxis";
import { digitToPercent } from "@/lib/utils";
import {
  getFeatureValues,
  getLineID,
  getPaths,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";
import {
  vmIDPrefix,
  volChangesFeatures,
} from "@stocks/plot/interactions/volume-momentum";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig, svgConfig } from "@/lib/theme";

export default function VolChange({
  features,
  width,
  height,
  x,
}: SubplotProps<"volumemomentum">) {
  const { marginTop, marginBottom } = plotSizeConfig;
  const { strokeWidth, markStrokeWidth, markStrokeDasharray } = svgConfig;
  const values = getFeatureValues<"volumemomentum">(features, volChangesFeatures);
  const y = getYScale(values, height - marginBottom, marginTop);
  const paths = getPaths<"volumemomentum">(features, volChangesFeatures, x, y);

  return (
    <g>
      <YAxis
        width={width}
        y={y}
        labelFormatter={(value: number) => digitToPercent(value, 0)}
      />
      {volChangesFeatures.map((featureName, i) => (
        <g key={getLineID(vmIDPrefix, featureName)}>
          <path
            id={getLineID(vmIDPrefix, featureName)}
            d={paths[featureName]}
            fill="none"
            stroke={colorPalette[i]}
            strokeWidth={strokeWidth}
          />
        </g>
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
    </g>
  );
}
