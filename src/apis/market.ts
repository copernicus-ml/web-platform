import z from "zod";
import { IndustryPctChangeSchema, StockPctChangeSchema } from "./schema";
import { DATA_URL, type DataServiceError } from "./shared";

const marketRankScopes = ["stockpct", "industrypct"] as const;
type MarketRankScope = (typeof marketRankScopes)[number];

const getStockPctChange = async (authToken: string, signal?: AbortSignal) => {
  const url = new URL(`data/market/analysis?scope=stockpct`, DATA_URL);
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
      `Failed to get stock pct change data. Status ${response.status}`;
    throw new Error(errorMessage);
  }
  const responseData = await response.json();
  const StockPctChangeResponseSchema = z.array(StockPctChangeSchema);
  const parsedResult = StockPctChangeResponseSchema.safeParse(responseData.data);
  if (parsedResult.success) {
    return parsedResult.data;
  }
  throw new Error(parsedResult.error.message);
};

const getIndustryPctChange = async (authToken: string, signal?: AbortSignal) => {
  const url = new URL(`data/market/analysis?scope=industrypct`, DATA_URL);
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
      `Failed to get stock pct change data. Status ${response.status}`;
    throw new Error(errorMessage);
  }
  const IndustryPctChangesResponseSchema = z.array(IndustryPctChangeSchema);
  const responseData = await response.json();
  const parsedResult = IndustryPctChangesResponseSchema.safeParse(responseData.data);
  if (parsedResult.success) {
    return parsedResult.data;
  }
  throw new Error(parsedResult.error.message);
};

export { getStockPctChange, getIndustryPctChange, marketRankScopes };
export type { MarketRankScope };
