import { pmIDPrefix, returnFeatures } from "@stocks/plot/interactions/price-momentum";
import { plotSizeConfig, priceColors } from "@/lib/theme";
import YAxis from "@/components/ui/YAxis";
import type { SubplotProps } from "@/components/stocks/shared";
import {
  getBarGroupID,
  getFeatureValues,
  getYScale,
} from "@stocks/plot/interactions/d3-utils";

export default function Returns({
  features,
  x,
  width,
  height,
}: SubplotProps<"pricemomentum">) {
  const { marginTop, marginBottom } = plotSizeConfig;

  const values = getFeatureValues<"pricemomentum">(features, returnFeatures);
  const y = getYScale(values, height - marginBottom, marginTop);
  const opacities = [1.0, 0.6, 0.4];

  return (
    <g>
      <YAxis
        y={y}
        width={width}
        labelPostfix="%"
        labelFormatter={(value: number) => (value * 100).toFixed(1)}
      />
      {returnFeatures.map((featureName, i) => {
        return (
          <g
            key={getBarGroupID(pmIDPrefix, featureName)}
            id={getBarGroupID(pmIDPrefix, featureName)}
          >
            {features.map((feature) => {
              const val = feature[featureName];
              return (
                <rect
                  key={`pm-${feature.date}-${featureName}`}
                  x={x(feature.date)}
                  y={val >= 0 ? y(val) : y(0)}
                  width={x.bandwidth()}
                  height={Math.abs(y(val) - y(0))}
                  opacity={opacities[i]}
                  fill={val >= 0 ? priceColors.up : priceColors.down}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
