import { stockRouteAPI } from "@/routes/stocks.$symbol";
import MALinesLegends from "./price-momentum/MALinesLegends";
import type {
  BollingerBandsFeature,
  CCIFeature,
  DEMAFeature,
  KDJFeature,
  MACDFeature,
  PriceMomentumFeature,
} from "@/apis";
import MACDLegends from "@stocks/plot/macd/MACDLegends";
import DEMALegends from "@stocks/plot/dema/DEMALegends";
import VolumesLegend from "@stocks/plot/VolumesLegend";
import TurnoverLegend from "@stocks/plot/market-activity/TurnoverLegend";
import BollingerBandsLegends from "@stocks/plot/bollinger-bands/BollingerBandsLegends";
import KDJLegends from "@stocks/plot/kdj/KDJLegends";
import CCILegends from "./cci/CCILegends";

export default function StockDataLegend() {
  const { prices, features } = stockRouteAPI.useLoaderData({
    select: (loaderData) => loaderData,
  });
  const featureGroup = stockRouteAPI.useSearch({
    select: (search) => search.group,
  });
  const getLegends = () => {
    switch (featureGroup) {
      case "pricemomentum":
        return <MALinesLegends features={features as PriceMomentumFeature[]} />;
      case "macd":
        return <MACDLegends features={features as MACDFeature[]} />;
      case "dema":
        return <DEMALegends features={features as DEMAFeature[]} />;
      case "marketactivity":
        return <TurnoverLegend prices={prices} />;
      case "bollingerbands":
        return <BollingerBandsLegends features={features as BollingerBandsFeature[]} />;
      case "kdj":
        return <KDJLegends features={features as KDJFeature[]} />;
      case "cci":
        return <CCILegends features={features as CCIFeature[]} />;
      default:
        return <VolumesLegend prices={prices} />;
    }
  };
  return (
    <div className="w-full flex gap-1 justify-center items-center py-1 h-6">
      {getLegends()}
    </div>
  );
}
