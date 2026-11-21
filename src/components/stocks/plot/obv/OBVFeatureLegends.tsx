import { useTranslation } from "react-i18next";
import {
  obvIDPrefix,
  obvMomentumFeatures,
  obvPressureFeatures,
  toggleOBVElements,
} from "@stocks/plot/interactions/obv";
import { digitToPercent } from "@/lib/utils";
import PlotLegend from "@/components/ui/PlotLegend";
import { getLegendID, getLegendValueID } from "../interactions/d3-utils";
import type { FeatureLegendProps } from "@stocks/shared";
import { colorPalette, markColor } from "@/lib/theme";

export default function OBVFeatureLegends({
  features,
  subplotName,
}: FeatureLegendProps<"obv">) {
  const { t } = useTranslation("stocks");
  const getFeatureParams = () => {
    switch (subplotName) {
      case "pressure":
        return {
          featureNames: obvPressureFeatures,
          formatFn: digitToPercent,
        };
      case "momentum":
        return {
          featureNames: obvMomentumFeatures,
          colors: [markColor],
        };
      default:
        return {};
    }
  };

  const { featureNames, formatFn, colors } = getFeatureParams();
  if (!featureNames) return <></>;
  const lastFeature = features.at(-1);
  return (
    <>
      {featureNames.map((featureName, i) => (
        <PlotLegend
          key={getLegendID(obvIDPrefix, featureName)}
          legendId={getLegendID(obvIDPrefix, featureName)}
          valueId={getLegendValueID(obvIDPrefix, featureName)}
          index={i}
          label={t(`featureName.${featureName}`)}
          value={
            formatFn
              ? formatFn(lastFeature![featureName])
              : lastFeature![featureName].toFixed(2)
          }
          color={colors ? colors[i] : colorPalette[i]}
          onClick={() => toggleOBVElements(featureName)}
        />
      ))}
    </>
  );
}
