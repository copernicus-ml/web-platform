import type { CCIFeature } from "@/apis";
import { cciCoreFeatures, cciIDPrefix, toggleCCIElement } from "../interactions/cci";
import PlotLegend from "@/components/ui/PlotLegend";
import { useTranslation } from "react-i18next";
import { getLegendID, getLegendValueID } from "../interactions/d3-utils";

export default function CCIFeatureLegends({ features }: { features: CCIFeature[] }) {
  const { t } = useTranslation("stocks");
  const featureNames = cciCoreFeatures;
  const lastFeature = features.at(-1);
  return (
    <>
      {featureNames.map((featureName, i) => (
        <PlotLegend
          key={getLegendID(cciIDPrefix, featureName)}
          legendId={getLegendID(cciIDPrefix, featureName)}
          valueId={getLegendValueID(cciIDPrefix, featureName)}
          index={i}
          label={t(`featureName.${featureName}`)}
          onClick={() => toggleCCIElement(featureName)}
          value={lastFeature![featureName].toFixed(2)}
        />
      ))}
    </>
  );
}
