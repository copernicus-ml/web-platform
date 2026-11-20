import * as d3 from "d3";
import { useAtomValue } from "jotai";
import type {
  BollingerBandsFeature,
  CCIFeature,
  DEMAFeature,
  KDJFeature,
  MACDFeature,
  PriceMomentumFeature,
} from "@/apis";
import { plotConfigAtom } from "@/atoms/plot";
import XAxis from "@/components/ui/XAxis";
import YAxis from "@/components/ui/YAxis";
import TrendLine from "@stocks/plot/StockTrendLine";
import CandleStick from "@stocks/plot/CandleSticks";
import Volumes from "@stocks/plot/Volumes";
import MALines from "@stocks/plot/price-momentum/MALines";
import StockDataIndicators from "@stocks/plot/StockDataIndicators";
import { getHoverPlotFn, getLeavePlotFn } from "@stocks/plot/interactions/hover";
import { plotSizeConfig } from "@/lib/theme";
import TurnoverBars from "@stocks/plot/market-activity/TurnoverBars";
import CrossoverSignals from "@stocks/plot/macd/CrossoverSignals";
import EMALines from "@stocks/plot/macd/EMALines";
import BollingerBands from "@stocks/plot/bollinger-bands/BollingerBands";
import DEMATrendLines from "@stocks/plot/dema/DEMATrendLines";
import DEMASignals from "@stocks/plot/dema/DEMASignals";
import KDJLowHigh from "@stocks/plot/kdj/KDJLowHigh";
import CCITpPlot from "@stocks/plot/cci/CCITpPlot";
import { stockRouteAPI } from "@/routes/stocks.$symbol";
import type { PriceChartType } from "@/components/stocks/shared";

type StockDataPlotProps = {
  chartType: PriceChartType;
  width: number;
  height: number;
  maxXTickNum?: number;
};

export default function StockDataPlot({
  chartType,
  width,
  height,
  maxXTickNum = 30,
}: StockDataPlotProps) {
  const plotConfig = useAtomValue(plotConfigAtom);
  const { prices, features } = stockRouteAPI.useLoaderData({
    select: (loaderData) => loaderData,
  });
  const featureGroup = stockRouteAPI.useSearch({
    select: (search) => search.group,
  });
  if (!prices) return <></>;
  const { marginTop, marginRight, marginBottom, marginLeft } = plotSizeConfig;

  // x-axis mapper
  const x = d3
    .scaleBand(
      prices.map((d) => d.date),
      [marginLeft, width - marginRight],
    )
    .paddingInner(0.2);
  const xSteps = Math.floor(prices.length / maxXTickNum);
  const xLabels = prices
    .filter((_, i) => (prices.length - 1 - i) % xSteps == 0)
    .map((d) => d.date);
  // y-axis mapper
  const yMax = d3.max(prices, (d) => d.high) ?? 1;
  const yMin = d3.min(prices, (d) => d.low) ?? 0;
  const yPadding = (yMax - yMin) * 0.05 || 1;
  const y = d3.scaleLinear(
    [yMin - yPadding, yMax + yPadding],
    [height - marginBottom, marginTop],
  );

  // controls hover-based indicators
  const onPointerMove = getHoverPlotFn({
    prices,
    features,
    featureGroup,
    width,
    referenceHeight: plotConfig.referenceHeight,
  });

  const onPointerLeave = getLeavePlotFn({
    prices,
    features,
    featureGroup,
    width,
    referenceHeight: plotConfig.referenceHeight,
  });

  const getFeaturesPlot = () => {
    switch (featureGroup) {
      case "pricemomentum":
        return (
          <MALines
            features={features as PriceMomentumFeature[]}
            chartType={chartType}
            x={x}
            y={y}
          />
        );

      case "marketactivity":
        return <TurnoverBars prices={prices} x={x} y={y} />;
      case "macd":
        return (
          <>
            <EMALines
              features={features as MACDFeature[]}
              chartType={chartType}
              x={x}
              y={y}
            />
            <CrossoverSignals features={features as MACDFeature[]} x={x} y={y} />
          </>
        );
      case "bollingerbands":
        return (
          <BollingerBands
            features={features as BollingerBandsFeature[]}
            x={x}
            y={y}
            chartType={chartType}
          />
        );
      case "dema":
        return (
          <>
            <DEMATrendLines
              features={features as DEMAFeature[]}
              x={x}
              y={y}
              chartType={chartType}
            />
            <DEMASignals features={features as DEMAFeature[]} x={x} y={y} />
          </>
        );
      case "kdj":
        return (
          <KDJLowHigh
            features={features as KDJFeature[]}
            chartType={chartType}
            x={x}
            y={y}
          />
        );
      case "cci":
        return (
          <CCITpPlot
            features={features as CCIFeature[]}
            chartType={chartType}
            x={x}
            y={y}
          />
        );
      default:
        return <Volumes prices={prices} x={x} y={y} />;
    }
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="overflow-visible cursor-crosshair flex-1"
    >
      {/* y axis marks */}
      <YAxis width={width} y={y} labelPrefix="$" />
      {/* x axis marks */}
      <XAxis labels={xLabels} x={x} xPos={0} yPos={height - marginBottom} />
      {/* price trend */}
      {features && getFeaturesPlot()}
      {chartType === "candle" && <CandleStick prices={prices} x={x} y={y} />}
      {chartType === "line" && (
        <TrendLine
          prices={prices}
          x={x}
          y={y}
          showArea={featureGroup !== "bollingerbands"}
        />
      )}
      <StockDataIndicators
        prices={prices}
        chartType={chartType}
        width={width}
        height={height}
        y={y}
      />
    </svg>
  );
}
