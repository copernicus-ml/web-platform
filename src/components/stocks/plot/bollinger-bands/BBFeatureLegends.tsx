import type { FeatureLegendProps } from "@stocks/shared";
import { useTranslation } from "react-i18next";
import {
  bbIDPrefix,
  positionFeature,
  toggleBBFeature,
  widthFeature,
} from "@stocks/plot/interactions/bollinger-bands";
import PlotLegend from "@/components/ui/PlotLegend";
import { getLegendID, getLegendValueID } from "../interactions/d3-utils";
import { colorPalette } from "@/lib/theme";

export default function BBFeatureLegends({
  features,
  subplotName,
}: FeatureLegendProps<"bollingerbands">) {
  const { t } = useTranslation("stocks");
  const getFeatureParams = () => {
    switch (subplotName) {
      case "position":
        return {
          featureName: positionFeature,
        };
      case "width":
        return {
          featureName: widthFeature,
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
      legendId={getLegendID(bbIDPrefix, featureName)}
      valueId={getLegendValueID(bbIDPrefix, featureName)}
      index={0}
      label={t(`featureName.${featureName}`)}
      color={colorPalette[2]}
      value={lastFeature![featureName].toFixed(2)}
      onClick={() => toggleBBFeature(featureName)}
    />
  );
}
