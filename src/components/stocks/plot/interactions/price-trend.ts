import * as d3 from "d3";
import { parseVolume, computePriceChange, parseDate, getMonthName } from "@/lib/utils";
import type { StockPrice } from "@/apis";
import { animationConfig, priceColors } from "../../../../lib/theme";
import { toggleElement, updateCirclePos, updateTextValue } from "./d3-utils";

const priceElementIds = {
  indicatorGroup: "price-indicator-group",
  indicatorPoint: "price-indicator-point",
  indicatorDateGroup: "price-indicator-date",
  indicatorDay: "price-indicator-day",
  indicatorMonth: "price-indicator-month",
  valuesOpen: "price-values-open",
  valuesClose: "price-values-close",
  valuesHigh: "price-values-high",
  valuesLow: "price-values-low",
  valuesVol: "price-values-vol",
  valuesPctChange: "price-pct-change",
  valuesPctRect: "price-pct-rect",
  valuesCurrGroup: "price-curr-group",
  valuesCurrRect: "price-curr-rect",
  valuesCurrVal: "price-curr-val",
  volumeBarGroup: "price-vol_group",
  volumeLegend: "price-vol-legend",
  volumeLegendValue: "price-vol-legend-val",
};

// update the vertical date line
const updateDateLine = (show: boolean, date?: string, xPos?: number) => {
  const { duration } = animationConfig;
  const { indicatorDateGroup, indicatorGroup, indicatorDay, indicatorMonth } =
    priceElementIds;
  d3.select(`#${indicatorGroup}`).attr("opacity", show ? 1 : 0);
  if (!show || !date) return;
  const dateElements = parseDate(date);
  // update line position
  d3.select(`#${indicatorGroup}`)
    .transition()
    .duration(duration)
    .ease(d3.easeLinear)
    .attr("transform", `translate(${xPos} 0)`);
  // update date value
  const dateGroup = d3.select(`#${indicatorDateGroup}`);
  dateGroup.select(`#${indicatorDay}`).text(dateElements[2]);
  dateGroup.select(`#${indicatorMonth}`).text(getMonthName(dateElements[1]));
};

// update hover tag's position, value, and color (tag on Y axis)
const updateHoverValueTag = (
  stock: StockPrice[],
  xIdx: number,
  y: d3.ScaleLinear<number, number>,
) => {
  const currClose = stock.at(xIdx)!["close"];
  const beginClose = stock.at(0)!["close"];
  const currPriceGroup = d3
    .transition()
    .duration(50)
    .ease(d3.easeLinear)
    .select(`#${priceElementIds.valuesCurrGroup}`)
    .attr("transform", `translate(0 ${y(currClose)})`);
  currPriceGroup
    .select("rect")
    .attr("fill", currClose >= beginClose ? priceColors.up : priceColors.down);
  currPriceGroup.select("text").text(`${currClose.toFixed(2)}`);
};

// update stock display values (V, L, H, C, O)
const updateDisplayValues = (StockPrice: StockPrice, priceChangePct: string) => {
  const { close, open, high, low, volume } = StockPrice;
  updateTextValue(priceElementIds.valuesClose, close.toFixed(2));
  updateTextValue(priceElementIds.valuesOpen, open.toFixed(2));
  updateTextValue(priceElementIds.valuesHigh, high.toFixed(2));
  updateTextValue(priceElementIds.valuesLow, low.toFixed(2));
  updateTextValue(priceElementIds.valuesVol, parseVolume(volume));
  updateTextValue(priceElementIds.valuesPctChange, priceChangePct);
};

// update volume legend
const updateVolumeLegend = (StockPrice: StockPrice) => {
  const { close, open } = StockPrice;
  const volumeLegend = d3.select(`#${priceElementIds.volumeLegend}`);
  if (!volumeLegend.empty()) {
    const volumeColor = close >= open ? priceColors.up : priceColors.down;
    volumeLegend.select("rect").attr("stroke", volumeColor);
    volumeLegend.select("text").attr("fill", volumeColor);
  }
};

const updatePriceTrendIndicators = ({
  prices,
  xIdx,
  x,
  y,
}: {
  prices: StockPrice[];
  pointerPos: number;
  xIdx: number;
  width: number;
  height: number;
  marginRight: number;
  marginBottom: number;
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
}) => {
  const indicatorGroup = d3.select(`#${priceElementIds.indicatorGroup}`);
  const { duration } = animationConfig;
  indicatorGroup.attr("opacity", 1);
  const { date, close } = prices[xIdx];
  d3.select(`#${priceElementIds.valuesPctRect}`).attr(
    "fill",
    close >= prices[0].close ? priceColors.up : priceColors.down,
  );
  const xPos = (x(date) ?? 0) + x.bandwidth() / 2;
  const yPos = y(close) ?? 0;
  updateCirclePos(priceElementIds.indicatorPoint, duration, 0, yPos);
  updateDateLine(true, date, xPos);
  updateDisplayValues(prices[xIdx], computePriceChange(prices.at(0)!.close, close));
  updateHoverValueTag(prices, xIdx, y);
  updateVolumeLegend(prices[xIdx]);
};

const resetPriceTrendIndicators = ({
  prices,
  y,
}: {
  prices: StockPrice[];
  width: number;
  marginRight: number;
  y: d3.ScaleLinear<number, number>;
}) => {
  const lastestStock = prices.at(-1);
  if (!lastestStock) return;
  const { close } = lastestStock;
  d3.select(`#${priceElementIds.valuesPctRect}`).attr(
    "fill",
    close > prices[0].close ? priceColors.up : priceColors.down,
  );
  updateDateLine(false);
  updateHoverValueTag(prices, -1, y);
  updateDisplayValues(lastestStock, computePriceChange(prices.at(0)!.close, close));
  updateVolumeLegend(lastestStock);
};

const toggleVolumeGroup = () => {
  toggleElement(priceElementIds.volumeBarGroup);
  toggleElement(priceElementIds.volumeLegend, 0.3, 1.0);
};

export {
  priceElementIds,
  updatePriceTrendIndicators,
  resetPriceTrendIndicators,
  toggleVolumeGroup,
};
