import { useTranslation } from "react-i18next";
import PlotLegend from "@/components/ui/PlotLegend";
import { getLegendID, getLegendValueID } from "../interactions/d3-utils";
import type { FeatureLegendProps } from "@stocks/shared";
import {
  toggleVolatilityFeature,
  volatilityIDPrefix,
  volatilityLogFeature,
  volatilityRankFeature,
} from "../interactions/volatility";

export default function ({ features, subplotName }: FeatureLegendProps<"volatility">) {
  const { t } = useTranslation("stocks");
  const getFeatureParams = () => {
    switch (subplotName) {
      case "logVolatility":
        return {
          featureName: volatilityLogFeature,
        };
      case "volatilityRank":
        return {
          featureName: volatilityRankFeature,
        };
      default:
        return {};
    }
  };
  const { featureName } = getFeatureParams();
  if (!featureName) return <></>;
  const lastFeature = features.at(-1);
  return (
    <PlotLegend
      legendId={getLegendID(volatilityIDPrefix, featureName)}
      valueId={getLegendValueID(volatilityIDPrefix, featureName)}
      index={0}
      label={t(`featureName.${featureName}`)}
      value={
        featureName === volatilityLogFeature || featureName === volatilityRankFeature
          ? lastFeature![featureName].toFixed(2)
          : undefined
      }
      onClick={() => toggleVolatilityFeature(featureName)}
    />
  );
}
