import * as d3 from "d3";
import type { KDJFeature } from "@/apis";
import { kdjIDPrefix, kdjLowHighFeatures } from "@stocks/plot/interactions/kdj";
import {
  getCircleID,
  getCirclesGroupID,
  getLineID,
  getPaths,
} from "@stocks/plot/interactions/d3-utils";
import { colorPalette, svgConfig } from "@/lib/theme";
import type { PriceChartType } from "@/components/stocks/shared";

type KDJLowHighProps = {
  features: KDJFeature[];
  chartType: PriceChartType;
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
};

export default function KDJLowHigh({ features, chartType, x, y }: KDJLowHighProps) {
  const { strokeWidth, strokeDasharray, circleR, circleStroke } = svgConfig;
  const paths = getPaths<"kdj">(features, kdjLowHighFeatures, x, y);
  const lastFeature = features.at(-1)!;
  return (
    <>
      {kdjLowHighFeatures.map((featureName, i) => (
        <g key={getLineID(kdjIDPrefix, featureName)}>
          <path
            id={getLineID(kdjIDPrefix, featureName)}
            d={paths[featureName]}
            fill="none"
            stroke={colorPalette[i]}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
          />
        </g>
      ))}
      <g id={getCirclesGroupID(kdjIDPrefix)} opacity={chartType === "line" ? 1 : 0}>
        {kdjLowHighFeatures.map((featureName, i) => (
          <circle
            key={getCircleID(kdjIDPrefix, featureName)}
            id={getCircleID(kdjIDPrefix, featureName)}
            cx={(x(lastFeature?.date) ?? 0) + x.bandwidth() / 2}
            cy={y(lastFeature[featureName])}
            fill={colorPalette[i]}
            r={circleR}
            strokeWidth={circleStroke}
            opacity={0}
            className="stroke-background"
          />
        ))}
      </g>
    </>
  );
}
