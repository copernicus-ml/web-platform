import { DATA_URL, processResponse } from "@/apis/shared";
import type { FeatureGroupOpt, DataWindowOpt } from "./schema";
import { z } from "zod";
import {
  dataWindowParam,
  featureGroupParam,
  FeatureSchemas,
  StockPriceSchema,
} from "./schema";

const StockPriceResponseSchema = z.array(StockPriceSchema);
type StockPriceResponse = z.infer<typeof StockPriceResponseSchema>;
const getStockFeaturesResponseSchema = <G extends FeatureGroupOpt>(group: G) => {
  return z.array(FeatureSchemas[group]);
};

const getStockPrices = async (
  symbol: string,
  window: DataWindowOpt,
  authToken: string,
  signal?: AbortSignal,
) => {
  const url = new URL(`data/stock/${symbol}?window=${dataWindowParam[window]}`, DATA_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    signal,
  });
  return processResponse<StockPriceResponse>(response, StockPriceResponseSchema);
};

const getStockFeatures = async (
  symbol: string,
  window: DataWindowOpt,
  featureGroup: FeatureGroupOpt = "pricemomentum",
  authToken: string,
  signal?: AbortSignal,
) => {
  const url = new URL(
    `data/features/${symbol}?window=${dataWindowParam[window]}&group=${featureGroupParam[featureGroup]}`,
    DATA_URL,
  );
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    signal,
  });
  const StockFeaturesResponseSchema = getStockFeaturesResponseSchema(featureGroup);
  type StockFeaturesResponse = z.infer<typeof StockFeaturesResponseSchema>;
  return processResponse<StockFeaturesResponse>(response, StockFeaturesResponseSchema);
};

export { getStockPrices, getStockFeatures };
