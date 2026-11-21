import PlotLegend from "@/components/ui/PlotLegend";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import {
  demaIDPrefix,
  getDEMAFeatureNamesByPeriod,
  toggleDEMAFeature,
} from "@stocks/plot/interactions/dema";
import { digitToPercent } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { demaPeriodAtom } from "@/atoms/plot";
import type { FeatureLegendProps } from "@stocks/shared";

export default function DemaFeatureLegend({ features }: FeatureLegendProps<"dema">) {
  const { t } = useTranslation("stocks");
  const demaPeriod = useAtomValue(demaPeriodAtom);
  const featureNames = getDEMAFeatureNamesByPeriod(demaPeriod);
  const spreadFeatureName = featureNames.filter((featureName) =>
    featureName.endsWith("spread"),
  )[0];
  return (
    <PlotLegend
      legendId={getLegendID(demaIDPrefix, spreadFeatureName)}
      valueId={getLegendValueID(demaIDPrefix, spreadFeatureName)}
      index={0}
      label={t(`featureName.spread`)}
      value={digitToPercent(features.at(-1)![spreadFeatureName])}
      onClick={() => toggleDEMAFeature(spreadFeatureName)}
    />
  );
}
