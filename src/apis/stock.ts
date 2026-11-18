import { DATA_URL, type DataServiceError } from "@/apis/shared";
import type { FeatureGroupOpt, DataWindowOpt } from "./schema";
import { z } from "zod";
import {
  dataWindowParam,
  featureGroupParam,
  FeatureSchemas,
  StockPriceSchema,
} from "./schema";

const StockPriceResponseSchema = z.array(StockPriceSchema);
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
  if (!response.ok) {
    const errorData = (await response.json()) as DataServiceError;
    const errorMessage =
      errorData.error.message ||
      `failed to get stock data for ${symbol}. Status: ${response.status}`;
    throw new Error(errorMessage);
  }
  const responseData = await response.json();
  const parsedResult = StockPriceResponseSchema.safeParse(responseData.data);
  if (parsedResult.success) {
    return parsedResult.data;
  }
  throw new Error(parsedResult.error.message);
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
  if (!response.ok) {
    const errorData = (await response.json()) as DataServiceError;
    const errorMessage =
      errorData.error.message ||
      `failed to get stock data for ${symbol}. Status: ${response.status}`;
    throw new Error(errorMessage);
  }
  const responseData = await response.json();
  const StockFeaturesResponseSchema = getStockFeaturesResponseSchema(featureGroup);
  const parsedResult = StockFeaturesResponseSchema.safeParse(responseData.data);
  if (parsedResult.success) {
    return parsedResult.data;
  }
  throw new Error(parsedResult.error.message);
};

export { getStockPrices, getStockFeatures };
