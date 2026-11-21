import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import { useTranslation } from "react-i18next";
import PlotLegend from "@/components/ui/PlotLegend";
import { colorPalette, markColor } from "@/lib/theme";
import {
  accelerationFeatures,
  macdIDPrefix,
  toggleMACDFeature,
} from "../interactions/macd";
import type { FeatureLegendProps } from "@stocks/shared";

export default function MACDFeatureLegends({
  features,
  subplotName,
}: FeatureLegendProps<"macd">) {
  const { t } = useTranslation("stocks");
  const getFeatureParams = () => {
    switch (subplotName) {
      case "acceleration":
        return {
          featureNames: accelerationFeatures,
          colors: [colorPalette[0], colorPalette[1], markColor],
        };
      default:
        return {};
    }
  };
  const { featureNames, colors } = getFeatureParams();
  if (!featureNames) return <></>;
  return (
    <>
      {features.at(-1) &&
        featureNames.map((featureName, i) => {
          return (
            <PlotLegend
              key={getLegendID(macdIDPrefix, featureName)}
              legendId={getLegendID(macdIDPrefix, featureName)}
              valueId={getLegendValueID(macdIDPrefix, featureName)}
              index={i}
              label={t(`featureName.${featureName}`)}
              value={features.at(-1)![featureName].toFixed(3)}
              color={colors && colors[i]}
              onClick={() => toggleMACDFeature(featureName)}
            />
          );
        })}
    </>
  );
}
