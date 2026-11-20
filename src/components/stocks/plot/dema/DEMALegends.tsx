import { useTranslation } from "react-i18next";
import { priceColors } from "@/lib/theme";
import type { DEMAFeature } from "@/apis";
import { useAtomValue } from "jotai";
import { demaPeriodAtom } from "@/atoms/plot";
import {
  demaIDPrefix,
  getDEMAFeatureNamesByPeriod,
  toggleDEMAFeature,
} from "@stocks/plot/interactions/dema";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import PlotLegend from "@/components/ui/PlotLegend";

type DEMALegendsProps = {
  features: DEMAFeature[];
};

export default function DEMALegends({ features }: DEMALegendsProps) {
  const { t } = useTranslation("stocks");
  const demaPeriod = useAtomValue(demaPeriodAtom);
  const featureNames = getDEMAFeatureNamesByPeriod(demaPeriod);
  const slowFastFeatureNames = featureNames.filter(
    (featureName) => featureName.endsWith("fast") || featureName.endsWith("slow"),
  );
  return (
    <>
      {/* DEMA Gold and Dead crosses */}
      <PlotLegend
        legendId={getLegendID(demaIDPrefix, "gold")}
        valueId={getLegendValueID(demaIDPrefix, "gold")}
        index={0}
        value={""}
        label={t("featureName.gold")}
        color={priceColors.up}
        onClick={() => toggleDEMAFeature("gold")}
      />
      <PlotLegend
        legendId={getLegendID(demaIDPrefix, "dead")}
        valueId={getLegendValueID(demaIDPrefix, "dead")}
        index={1}
        value={""}
        label={t("featureName.dead")}
        color={priceColors.down}
        onClick={() => toggleDEMAFeature("dead")}
      />
      {/* Fast Slow lines */}
      {slowFastFeatureNames.map((featureName, i) => (
        <PlotLegend
          key={getLegendID(demaIDPrefix, featureName)}
          legendId={getLegendID(demaIDPrefix, featureName)}
          valueId={getLegendValueID(demaIDPrefix, featureName)}
          index={i}
          label={t(
            `featureName.${featureName.endsWith("slow") ? "demaSlow" : "demaFast"}`,
          )}
          value={features.at(-1)![featureName].toFixed(2)}
          onClick={() => toggleDEMAFeature(featureName)}
        />
      ))}
    </>
  );
}
