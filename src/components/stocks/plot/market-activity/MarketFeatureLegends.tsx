import type { FeatureLegendProps } from "@stocks/shared";
import { useTranslation } from "react-i18next";
import {
  activityScoreFeatures,
  amplitudeFeatures,
  getLegendID,
  getLegendValueID,
  marketIDPrefix,
  priceAndTurnoverFeatures,
  toggleFeature,
} from "../interactions/market-activity";
import PlotLegend from "@/components/ui/PlotLegend";

export default function MarketFeatureLegends({
  features,
  subplotName,
}: FeatureLegendProps<"marketactivity">) {
  const { t } = useTranslation("stocks");
  const getFeatureParams = () => {
    switch (subplotName) {
      case "activityScores":
        return {
          featureNames: activityScoreFeatures,
        };
      case "priceAndTurnover":
        return {
          featureNames: priceAndTurnoverFeatures,
        };
      case "amplitude":
        return {
          featureNames: amplitudeFeatures,
          formatFn: (value: number) => `${(value * 100).toFixed(2)}%`,
        };
      default:
        return {};
    }
  };

  const { featureNames, formatFn } = getFeatureParams();
  if (!featureNames) return <></>;
  const lastFeature = features.at(-1);
  return (
    <>
      {featureNames.map((featureName, i) => (
        <PlotLegend
          key={getLegendID(marketIDPrefix, featureName)}
          legendId={getLegendID(marketIDPrefix, featureName)}
          valueId={getLegendValueID(marketIDPrefix, featureName)}
          index={i}
          label={t(`featureName.${featureName}`)}
          value={
            formatFn
              ? formatFn(lastFeature![featureName])
              : lastFeature![featureName].toFixed(2)
          }
          onClick={() => toggleFeature(featureName)}
        />
      ))}
    </>
  );
}
