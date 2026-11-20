import { useTranslation } from "react-i18next";
import type { BollingerBandsFeature } from "@/apis";
import { colorPalette } from "@/lib/theme";
import {
  bbIDPrefix,
  toggleBand,
  toggleBBFeature,
} from "@stocks/plot/interactions/bollinger-bands";
import { getLegendID, getLegendValueID } from "@stocks/plot/interactions/d3-utils";
import PlotLegend from "@/components/ui/PlotLegend";

type BollingerBandsLegendsProps = {
  features: BollingerBandsFeature[];
};

export default function BollingerBandsLegends({ features }: BollingerBandsLegendsProps) {
  const { t } = useTranslation("stocks");
  const lastFeature = features.at(-1)!;
  return (
    <>
      <PlotLegend
        legendId={getLegendID(bbIDPrefix, "band")}
        valueId={getLegendValueID(bbIDPrefix, "band")}
        value={`L ${lastFeature["bbLower"].toFixed(2)} U ${lastFeature["bbUpper"].toFixed(2)}`}
        index={0}
        label={t("featureName.bb")}
        color={colorPalette[2]}
        onClick={toggleBand}
      />
      {/* BB Mid */}
      <PlotLegend
        legendId={getLegendID(bbIDPrefix, "bbMid")}
        valueId={getLegendValueID(bbIDPrefix, "bbMid")}
        value={lastFeature["bbMid"].toFixed(2)}
        index={0}
        label={t("featureName.mid")}
        color={colorPalette[0]}
        onClick={() => toggleBBFeature("bbMid")}
      />
    </>
  );
}
