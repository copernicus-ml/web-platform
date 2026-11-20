import type { StockPrice } from "@/apis";
import { priceColors } from "@/lib/theme";
import { useTranslation } from "react-i18next";
import {
  priceElementIds,
  toggleVolumeGroup,
} from "@stocks/plot/interactions/price-trend";
import PlotLegend from "@/components/ui/PlotLegend";

type VolumesLegendProps = {
  prices: StockPrice[];
};

export default function VolumesLegend({ prices }: VolumesLegendProps) {
  const { t } = useTranslation("stocks");
  if (!prices) return <></>;
  return (
    <PlotLegend
      legendId={priceElementIds.volumeLegend}
      valueId={priceElementIds.volumeLegendValue}
      index={0}
      label={t(`featureName.volume`)}
      color={priceColors.up}
      onClick={() => toggleVolumeGroup()}
    />
  );
}
