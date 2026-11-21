import PlotLegend from "@/components/ui/PlotLegend";
import {
  kdjCoreFeatures,
  kdjIDPrefix,
  toggleKDJElement,
} from "@stocks/plot/interactions/kdj";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import type { KDJFeature } from "@/apis";
import { useTranslation } from "react-i18next";

export default function KDJFeatureLegends({ features }: { features: KDJFeature[] }) {
  const { t } = useTranslation("stocks");
  const featureNames = kdjCoreFeatures;
  const lastFeature = features.at(-1);
  return (
    <>
      {featureNames.map((featureName, i) => (
        <PlotLegend
          key={getLegendID(kdjIDPrefix, featureName)}
          legendId={getLegendID(kdjIDPrefix, featureName)}
          valueId={getLegendValueID(kdjIDPrefix, featureName)}
          index={i}
          label={t(`featureName.${featureName}`)}
          onClick={() => toggleKDJElement(featureName)}
          value={lastFeature![featureName].toFixed(2)}
        />
      ))}
    </>
  );
}
