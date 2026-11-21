import YAxis from "@/components/ui/YAxis";
import {
  getBarGroupID,
  getFeatureValues,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";
import { obvIDPrefix, obvMomentumFeatures } from "@stocks/plot/interactions/obv";
import type { SubplotProps } from "@/components/stocks/shared";
import { plotSizeConfig, priceColors } from "@/lib/theme";

export default function OBVMomentum({ features, width, height, x }: SubplotProps<"obv">) {
  const { marginTop, marginBottom } = plotSizeConfig;
  const values = getFeatureValues<"obv">(features, obvMomentumFeatures);
  const y = getYScale(values, height - marginBottom, marginTop);
  return (
    <>
      <YAxis y={y} width={width} />
      {obvMomentumFeatures.map((featureName) => (
        <g
          key={getBarGroupID(obvIDPrefix, featureName)}
          id={getBarGroupID(obvIDPrefix, featureName)}
        >
          {features.map((feature) => {
            const positive = feature[featureName] >= 0;
            return (
              <rect
                key={`obv-rect-${feature.date}`}
                x={x(feature.date)}
                y={positive ? y(feature[featureName]) : y(0)}
                width={x.bandwidth()}
                height={Math.abs(y(0) - y(feature[obvMomentumFeatures[0]]))}
                fill={positive ? priceColors.up : priceColors.down}
                opacity={0.9}
              />
            );
          })}
        </g>
      ))}
    </>
  );
}
