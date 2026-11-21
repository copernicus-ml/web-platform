import { useTranslation } from "react-i18next";
import {
  toggleVolumeFeature,
  vmIDPrefix,
  volBiasFeatures,
  volChangesFeatures,
  volMARatioFeatures,
} from "@stocks/plot/interactions/volume-momentum";
import PlotLegend from "@/components/ui/PlotLegend";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import { digitToPercent } from "@/lib/utils";
import type { FeatureLegendProps } from "@stocks/shared";

export default function VolFeatureLegends({
  features,
  subplotName,
}: FeatureLegendProps<"volumemomentum">) {
  const { t } = useTranslation("stocks");
  const getFeatureParams = () => {
    switch (subplotName) {
      case "volumeBias":
        return {
          featureNames: volBiasFeatures,
          formatFn: digitToPercent,
        };
      case "volumeChanges":
        return {
          featureNames: volChangesFeatures,
          formatFn: digitToPercent,
        };
      case "volumeMARatio":
        return {
          featureNames: volMARatioFeatures,
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
          key={getLegendID(vmIDPrefix, featureName)}
          legendId={getLegendID(vmIDPrefix, featureName)}
          valueId={getLegendValueID(vmIDPrefix, featureName)}
          index={i}
          label={t(`featureName.${featureName}`)}
          value={
            formatFn
              ? formatFn(lastFeature![featureName])
              : lastFeature![featureName].toFixed(2)
          }
          onClick={() => toggleVolumeFeature(featureName)}
        />
      ))}
    </>
  );
}
