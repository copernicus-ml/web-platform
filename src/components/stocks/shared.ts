import type { FeatureByGroup, FeatureGroupOpt } from "@/apis";

export const priceChartTypes = ["candle", "line"] as const;
export type PriceChartType = (typeof priceChartTypes)[number];

export type SubplotProps<G extends FeatureGroupOpt> = {
  features: FeatureByGroup[G][];
  width: number;
  height: number;
  x: d3.ScaleBand<string>;
};

export type FeatureLegendProps<G extends FeatureGroupOpt> = {
  features: FeatureByGroup[G][];
  subplotName?: string;
};
