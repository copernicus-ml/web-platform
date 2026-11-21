import { upDayRatioFeatures, pmIDPrefix } from "@stocks/plot/interactions/price-momentum";
import YAxis from "@/components/ui/YAxis";
import { colorPalette, plotSizeConfig, svgConfig } from "@/lib/theme";
import type { SubplotProps } from "@/components/stocks/shared";
import { getLineID, getPaths, getYScale } from "@stocks/plot/interactions/d3-utils";

export default function UpDayRatio({
  features,
  width,
  height,
  x,
}: SubplotProps<"pricemomentum">) {
  const { marginTop, marginRight, marginBottom, marginLeft } = plotSizeConfig;
  const y = getYScale([0.0, 1.0], height - marginBottom, marginTop);
  const paths = getPaths<"pricemomentum">(features, upDayRatioFeatures, x, y);
  const legendLabels: string[] = [];
  upDayRatioFeatures.forEach((featureName) => {
    const daysLabel = featureName.match(/\d+/);
    if (!daysLabel) legendLabels.push(featureName);
    else legendLabels.push(`${daysLabel}D`);
  });

  return (
    <>
      <YAxis
        y={y}
        width={width}
        labelPostfix="%"
        labelFormatter={(value: number) => (value * 100).toFixed(1)}
      />
      <line
        x1={marginLeft}
        x2={width - marginRight}
        y1={y(0.5)}
        y2={y(0.5)}
        className="stroke-mark"
        strokeWidth={svgConfig.strokeWidth}
        strokeDasharray={svgConfig.strokeDasharray}
      />
      {Object.entries(paths).map(([featureName, value], i) => (
        <path
          key={getLineID(pmIDPrefix, featureName)}
          id={getLineID(pmIDPrefix, featureName)}
          d={value}
          fill="none"
          strokeWidth={1.7}
          stroke={colorPalette[i]}
        />
      ))}
    </>
  );
}
