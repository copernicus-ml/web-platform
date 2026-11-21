import { stockRouteAPI } from "@/routes/stocks.$symbol";
import type {
  BollingerBandsFeature,
  CCIFeature,
  DEMAFeature,
  FeatureGroupOpt,
  KDJFeature,
  MACDFeature,
  MarketActivityFeature,
  OBVFeature,
  PriceMomentumFeature,
  RSIFeature,
  VolatilityFeature,
  VolumeMomentumFeature,
} from "@/apis";
import PMFeatureLegends from "./price-momentum/PMFeatureLegends";
import MACDFeatureLegends from "./macd/MACDFeatureLegends";
import DemaFeatureLegend from "./dema/DemaFeatureLegend";
import VolFeatureLegends from "./volume-momentum/VolFeatureLegends";
import OBVFeatureLegends from "./obv/OBVFeatureLegends";
import MarketFeatureLegends from "./market-activity/MarketFeatureLegends";
import VolatilityFeatureLegends from "./volatility/VolatilityFeatureLegends";
import BBFeatureLegends from "./bollinger-bands/BBFeatureLegends";
import RSILegends from "./rsi/RSILegends";
import KDJFeatureLegends from "./kdj/KDJFeatureLegends";
import CCIFeatureLegends from "./cci/CCIFeatureLegends";

type StockFeatureLegendsProps = {
  featureGroup: FeatureGroupOpt;
  featureSubPlot: string;
};

export default function StockFeatureLegends({
  featureGroup,
  featureSubPlot,
}: StockFeatureLegendsProps) {
  const { features } = stockRouteAPI.useLoaderData();
  const getLegends = () => {
    switch (featureGroup) {
      case "pricemomentum":
        return (
          <PMFeatureLegends
            features={features as PriceMomentumFeature[]}
            subplotName={featureSubPlot}
          />
        );
      case "macd":
        return (
          <MACDFeatureLegends
            features={features as MACDFeature[]}
            subplotName={featureSubPlot}
          />
        );
      case "dema":
        return <DemaFeatureLegend features={features as DEMAFeature[]} />;
      case "volumemomentum":
        return (
          <VolFeatureLegends
            features={features as VolumeMomentumFeature[]}
            subplotName={featureSubPlot}
          />
        );
      case "obv":
        return (
          <OBVFeatureLegends
            features={features as OBVFeature[]}
            subplotName={featureSubPlot}
          />
        );
      case "marketactivity":
        return (
          <MarketFeatureLegends
            features={features as MarketActivityFeature[]}
            subplotName={featureSubPlot}
          />
        );
      case "volatility":
        return (
          <VolatilityFeatureLegends
            features={features as VolatilityFeature[]}
            subplotName={featureSubPlot}
          />
        );
      case "bollingerbands":
        return (
          <BBFeatureLegends
            features={features as BollingerBandsFeature[]}
            subplotName={featureSubPlot}
          />
        );
      case "rsi":
        return <RSILegends features={features as RSIFeature[]} />;
      case "kdj":
        return <KDJFeatureLegends features={features as KDJFeature[]} />;
      case "cci":
        return <CCIFeatureLegends features={features as CCIFeature[]} />;
    }
  };
  return (
    <div className="w-full flex gap-1 justify-center items-center py-1 h-6">
      {getLegends()}
    </div>
  );
}
