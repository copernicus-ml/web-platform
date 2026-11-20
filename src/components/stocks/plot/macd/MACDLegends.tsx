import { useTranslation } from "react-i18next";
import type { MACDFeature } from "@/apis";
import { priceColors } from "@/lib/theme";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import {
  emaFeatures,
  macdIDPrefix,
  toggleMACDFeature,
} from "@stocks/plot/interactions/macd";
import PlotLegend from "@/components/ui/PlotLegend";

type MACDIndicatorsProps = {
  features: MACDFeature[];
};

export default function MACDLegends({ features }: MACDIndicatorsProps) {
  const { t } = useTranslation("stocks");
  return (
    <>
      {/* MACD Gold and Dead crosses */}
      <PlotLegend
        legendId={getLegendID(macdIDPrefix, "gold")}
        valueId={getLegendValueID(macdIDPrefix, "gold")}
        index={0}
        value={""}
        label={t("featureName.gold")}
        color={priceColors.up}
        onClick={() => toggleMACDFeature("gold")}
      />
      <PlotLegend
        legendId={getLegendID(macdIDPrefix, "dead")}
        valueId={getLegendValueID(macdIDPrefix, "dead")}
        index={1}
        value={""}
        label={t("featureName.dead")}
        color={priceColors.down}
        onClick={() => toggleMACDFeature("dead")}
      />
      {/* EMA lines */}
      {emaFeatures.map((featureName, i) => (
        <PlotLegend
          key={getLegendID(macdIDPrefix, featureName)}
          legendId={getLegendID(macdIDPrefix, featureName)}
          valueId={getLegendValueID(macdIDPrefix, featureName)}
          index={i}
          label={t(`featureName.${featureName}`)}
          value={features.at(-1)![featureName].toFixed(2)}
          onClick={() => toggleMACDFeature(featureName)}
        />
      ))}
    </>
  );
}
