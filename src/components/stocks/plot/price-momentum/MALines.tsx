import * as d3 from "d3";
import type { FeatureByGroup } from "@/apis";
import { colorPalette, svgConfig } from "@/lib/theme";
import { maFeatures, pmIDPrefix } from "@stocks/plot/interactions/price-momentum";
import {
  getCircleID,
  getCirclesGroupID,
  getLineID,
  getPaths,
} from "@stocks/plot/interactions/d3-utils";
import type { PriceChartType } from "@stocks/shared";

type PriceMomentumFeature = FeatureByGroup["pricemomentum"];

type MALinesProps = {
  features: PriceMomentumFeature[];
  chartType: PriceChartType;
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
};

export default function MALines({ features, chartType, x, y }: MALinesProps) {
  const { strokeWidth, opacity } = svgConfig;
  const paths = getPaths<"pricemomentum">(features, maFeatures, x, y);
  return (
    <>
      <g>
        {Object.entries(paths).map(([featureName, value], i) => (
          <path
            key={getLineID(pmIDPrefix, featureName)}
            id={getLineID(pmIDPrefix, featureName)}
            d={value}
            fill="none"
            stroke={colorPalette[i]}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
        ))}
        {/* Moving average lines */}
      </g>
      <g id={getCirclesGroupID(pmIDPrefix)} opacity={chartType === "line" ? 1 : 0}>
        {maFeatures.map((featureName, i) => (
          <circle
            key={getCircleID(pmIDPrefix, featureName)}
            id={getCircleID(pmIDPrefix, featureName)}
            r={svgConfig.circleR}
            fill={colorPalette[i]}
            strokeWidth={svgConfig.circleStroke}
            opacity={0}
            className="stroke-background"
          />
        ))}
      </g>
    </>
  );
}
