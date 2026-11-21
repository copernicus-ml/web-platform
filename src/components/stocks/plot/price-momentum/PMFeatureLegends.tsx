import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import {
  maBiasFeatures,
  pmIDPrefix,
  returnFeatures,
  toggleFeature,
  upDayRatioFeatures,
} from "@stocks/plot/interactions/price-momentum";
import { useTranslation } from "react-i18next";
import PlotLegend from "@/components/ui/PlotLegend";
import { digitToPercent } from "@/lib/utils";
import { markColor } from "@/lib/theme";
import type { FeatureLegendProps } from "@stocks/shared";

export default function PMFeatureLegends({
  features,
  subplotName,
}: FeatureLegendProps<"pricemomentum">) {
  const { t } = useTranslation("stocks");
  const getFeatureNames = () => {
    switch (subplotName) {
      case "maBias":
        return { featureNames: maBiasFeatures, valueFormatFn: digitToPercent };
      case "return":
        return {
          featureNames: returnFeatures,
          valueFormatFn: digitToPercent,
          colors: Array(returnFeatures.length).fill(markColor).flat(),
          opacities: [1.0, 0.6, 0.4],
        };
      case "upDayRatio":
        return {
          featureNames: upDayRatioFeatures,
          valueFormatFn: digitToPercent,
        };
      default:
        return {};
    }
  };
  const { featureNames, valueFormatFn, colors, opacities } = getFeatureNames();
  if (!featureNames) return <></>;
  return (
    <>
      {features.at(-1) &&
        featureNames.map((featureName, i) => {
          return (
            <PlotLegend
              key={getLegendID(pmIDPrefix, featureName)}
              legendId={getLegendID(pmIDPrefix, featureName)}
              valueId={getLegendValueID(pmIDPrefix, featureName)}
              index={i}
              label={t(`featureName.${featureName}`)}
              value={
                valueFormatFn
                  ? valueFormatFn(features.at(-1)![featureName])
                  : features.at(-1)![featureName].toFixed(2)
              }
              color={colors && colors[i]}
              opacity={opacities ? opacities[i] : undefined}
              onClick={() => toggleFeature(featureName)}
            />
          );
        })}
    </>
  );
}
