import type { FeatureByGroup } from "@/apis";
import {
  maFeatures,
  pmIDPrefix,
  toggleFeature,
} from "@stocks/plot/interactions/price-momentum";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import PlotLegend from "@/components/ui/PlotLegend";

type MAIndicatorsProps = {
  features: FeatureByGroup["pricemomentum"][];
};

export default function MALinesLegends({ features }: MAIndicatorsProps) {
  return (
    <>
      {/* Moving average legends */}
      {features.at(-1) &&
        maFeatures.map((featureName, i) => {
          return (
            <PlotLegend
              key={getLegendID(pmIDPrefix, featureName)}
              legendId={getLegendID(pmIDPrefix, featureName)}
              valueId={getLegendValueID(pmIDPrefix, featureName)}
              index={i}
              value={features.at(-1)![featureName].toFixed(2)}
              label={featureName.toUpperCase()}
              onClick={() => toggleFeature(featureName)}
            />
          );
        })}
    </>
  );
}
