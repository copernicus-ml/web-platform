import PlotLegend from "@/components/ui/PlotLegend";
import {
  rsiFeatures,
  rsiIDPrefix,
  toggleRSIFeature,
} from "@stocks/plot/interactions/rsi";
import { useTranslation } from "react-i18next";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import type { RSIFeature } from "@/apis";

export default function RSILegends({ features }: { features: RSIFeature[] }) {
  const { t } = useTranslation("stocks");
  const featureNames = rsiFeatures;
  const lastFeature = features.at(-1);
  return (
    <>
      {featureNames.map((featureName, i) => (
        <PlotLegend
          key={getLegendID(rsiIDPrefix, featureName)}
          legendId={getLegendID(rsiIDPrefix, featureName)}
          valueId={getLegendValueID(rsiIDPrefix, featureName)}
          index={i}
          label={t(`featureName.${featureName.match(/\d+/)}D`)}
          value={lastFeature![featureName].toFixed(2)}
          onClick={() => toggleRSIFeature(featureName)}
        />
      ))}
    </>
  );
}
