import { useTranslation } from "react-i18next";
import type { KDJFeature } from "@/apis";
import {
  kdjIDPrefix,
  kdjLowHighFeatures,
  toggleKDJElement,
} from "@stocks/plot/interactions/kdj";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import { colorPalette } from "@/lib/theme";
import PlotLegend from "@/components/ui/PlotLegend";

type KDJLegendsProps = {
  features: KDJFeature[];
};

export default function KDJLegends({ features }: KDJLegendsProps) {
  const { t } = useTranslation("stocks");
  return (
    <>
      {kdjLowHighFeatures.map((featureName, i) => (
        <PlotLegend
          legendId={getLegendID(kdjIDPrefix, featureName)}
          valueId={getLegendValueID(kdjIDPrefix, featureName)}
          color={colorPalette[i]}
          index={i}
          label={t(`featureName.${featureName}`)}
          value={features.at(-1)![featureName].toFixed(2)}
          onClick={() => toggleKDJElement(featureName)}
        />
      ))}
    </>
  );
}
