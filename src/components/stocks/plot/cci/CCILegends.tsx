import type { CCIFeature } from "@/apis";
import {
  cciIDPrefix,
  cciTpFeatures,
  toggleCCIElement,
} from "@stocks/plot/interactions/cci";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import { colorPalette } from "@/lib/theme";
import { useTranslation } from "react-i18next";
import PlotLegend from "@/components/ui/PlotLegend";

type CCILegendsProps = {
  features: CCIFeature[];
};

export default function CCILegends({ features }: CCILegendsProps) {
  const { t } = useTranslation("stocks");
  return (
    <>
      {cciTpFeatures.map((featureName, i) => (
        <PlotLegend
          key={getLegendID(cciIDPrefix, featureName)}
          legendId={getLegendID(cciIDPrefix, featureName)}
          valueId={getLegendValueID(cciIDPrefix, featureName)}
          color={colorPalette[i]}
          index={i}
          label={t(`featureName.${featureName}`)}
          value={features.at(-1)![featureName].toFixed(2)}
          onClick={() => toggleCCIElement(featureName)}
        />
      ))}
    </>
  );
}
