import { useAtomValue } from "jotai";
import { demaPeriodAtom } from "@/atoms/plot";
import {
  demaIDPrefix,
  getDEMAFeatureNamesByPeriod,
} from "@stocks/plot/interactions/dema";
import type { SubplotProps } from "@/components/stocks/shared";
import DEMASignals from "@stocks/plot/dema/DEMASignals";
import { colorPalette, plotSizeConfig, svgConfig } from "@/lib/theme";
import YAxis from "@/components/ui/YAxis";
import { getLineID, getPaths, getYScale } from "@stocks/plot/interactions/d3-utils";

export default function DEMASpread({ features, width, height, x }: SubplotProps<"dema">) {
  const { marginLeft, marginRight, marginTop, marginBottom } = plotSizeConfig;
  const { strokeWidth, markStrokeWidth, markStrokeDasharray } = svgConfig;
  const demaPeriod = useAtomValue(demaPeriodAtom);
  const featureNames = getDEMAFeatureNamesByPeriod(demaPeriod);
  const spreadFeatureName = featureNames.filter((featureName) =>
    featureName.endsWith("spread"),
  )[0];
  const values = features.map((feature) => feature[spreadFeatureName]);
  const y = getYScale(values, height - marginBottom, marginTop);
  const path = getPaths<"dema">(features, [spreadFeatureName], x, y)[spreadFeatureName];
  if (!path) return <></>;

  return (
    <>
      <YAxis
        y={y}
        width={width}
        labelFormatter={(value) => (value * 100).toFixed(2)}
        labelPostfix="%"
      />
      <DEMASignals features={features} x={x} y={y} currPlot="feature" />
      <line
        x1={marginLeft + x.bandwidth() / 2}
        x2={width - marginRight - x.bandwidth() / 2}
        y1={y(0)}
        y2={y(0)}
        strokeWidth={markStrokeWidth}
        strokeDasharray={markStrokeDasharray}
        className="stroke-mark"
      />
      <path
        id={getLineID(demaIDPrefix, spreadFeatureName)}
        d={path}
        fill="none"
        stroke={colorPalette[0]}
        strokeWidth={strokeWidth}
      />
    </>
  );
}
