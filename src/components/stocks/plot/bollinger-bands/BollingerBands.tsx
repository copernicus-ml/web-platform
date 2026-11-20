import * as d3 from "d3";
import type { BollingerBandsFeature } from "@/apis";
import { colorPalette, svgConfig } from "@/lib/theme";
import type { PriceChartType } from "@/components/stocks/shared";
import {
  bandFeatures,
  bbIDPrefix,
  getBBGroupID,
} from "@stocks/plot/interactions/bollinger-bands";
import {
  getCircleID,
  getCirclesGroupID,
  getLineID,
  getPaths,
} from "@stocks/plot/interactions/d3-utils";

type BollingerBandsProps = {
  features: BollingerBandsFeature[];
  chartType: PriceChartType;
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
};

export default function BollingerBands({
  features,
  chartType,
  x,
  y,
}: BollingerBandsProps) {
  const area = d3
    .area<BollingerBandsFeature>()
    .x((feature) => (x(feature.date) ?? 0) + x.bandwidth() / 2)
    .y0((feature) => Math.min(y(feature.bbLower), y.range()[0]))
    .y1((feature) => Math.max(y(feature.bbUpper), y.range()[1]))(features);
  const paths = getPaths<"bollingerbands">(features, bandFeatures, x, y);

  if (!area) return <></>;
  const lastFeature = features.at(-1)!;
  return (
    <>
      {/* BB Band */}
      <g id={getBBGroupID()}>
        <path d={area} fill={colorPalette[2]} opacity={0.1} />
        {["bbUpper", "bbLower"].map((featureName) => (
          <path
            key={getLineID(bbIDPrefix, featureName)}
            d={paths[featureName]}
            stroke={colorPalette[2]}
            strokeWidth={svgConfig.strokeWidth}
            fill="none"
            strokeDasharray={svgConfig.strokeDasharray}
          />
        ))}
      </g>
      <g>
        <path
          id={getLineID(bbIDPrefix, "bbMid")}
          d={paths["bbMid"]}
          stroke={colorPalette[0]}
          strokeWidth={svgConfig.strokeWidth}
          fill="none"
        />
      </g>
      <g id={getCirclesGroupID("bbMid")} opacity={0}>
        {chartType === "line" && (
          <circle
            id={getCircleID(bbIDPrefix, "bbMid")}
            cx={(x(lastFeature.date) ?? 0) + x.bandwidth() / 2}
            cy={y(lastFeature["bbMid"])}
            r={svgConfig.circleR}
            fill={colorPalette[0]}
            strokeWidth={svgConfig.circleStroke}
            className="stroke-background"
          />
        )}
      </g>
    </>
  );
}
