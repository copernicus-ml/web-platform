import * as d3 from "d3";
import type { MACDFeature } from "@/apis";
import { emaFeatures, macdIDPrefix } from "@stocks/plot/interactions/macd";
import { colorPalette, svgConfig } from "@/lib/theme";
import { getCircleID, getLineID, getPaths } from "@stocks/plot/interactions/d3-utils";
import type { PriceChartType } from "@stocks/shared";

type EMALinesProps = {
  features: MACDFeature[];
  chartType: PriceChartType;
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
};

export default function EMALines({ features, chartType, x, y }: EMALinesProps) {
  const { strokeWidth, opacity } = svgConfig;
  const paths = getPaths<"macd">(features, emaFeatures, x, y);
  return (
    <g>
      {Object.entries(paths).map(([featureName, value], i) => (
        <path
          key={getLineID(macdIDPrefix, featureName)}
          id={getLineID(macdIDPrefix, featureName)}
          d={value}
          fill="none"
          stroke={colorPalette[i]}
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
      ))}
      {/* EMA circles */}
      <g opacity={chartType === "line" ? 1 : 0}>
        {emaFeatures.map((featureName, i) => (
          <circle
            key={getCircleID(macdIDPrefix, featureName)}
            id={getCircleID(macdIDPrefix, featureName)}
            r={svgConfig.circleR}
            fill={colorPalette[i]}
            strokeWidth={svgConfig.circleStroke}
            opacity={0}
            className="stroke-background"
          />
        ))}
      </g>
    </g>
  );
}
