import z from "zod";
import { DATA_URL, processResponse } from "./shared";

const StockPctChangeSchema = z
  .object({
    symbol: z.string(),
    company_name: z.string().default(""),
    sub_industry: z.string(),
    pct_change_1d: z.float32(),
    pct_change_5d: z.float32(),
    pct_change_10d: z.float32(),
    pct_change_20d: z.float32(),
    pct_change_60d: z.float32(),
  })
  .transform((input) => ({
    symbol: input.symbol,
    companyName: input.company_name,
    subIndustry: input.sub_industry,
    pct1d: input.pct_change_1d,
    pct5d: input.pct_change_5d,
    pct10d: input.pct_change_10d,
    pct20d: input.pct_change_20d,
    pct60d: input.pct_change_60d,
  }));
export type StockPctChange = z.infer<typeof StockPctChangeSchema>;

const StockPctChangeResponseSchema = z.array(StockPctChangeSchema);
type StockPctChangeResponse = z.infer<typeof StockPctChangeResponseSchema>;

const IndustryPctChangeSchema = z
  .object({
    sub_industry: z.string(),
    pct_change_1d: z.float32(),
    pct_change_5d: z.float32(),
    pct_change_10d: z.float32(),
    pct_change_20d: z.float32(),
    pct_change_60d: z.float32(),
  })
  .transform((input) => ({
    subIndustry: input.sub_industry,
    pct1d: input.pct_change_1d,
    pct5d: input.pct_change_5d,
    pct10d: input.pct_change_10d,
    pct20d: input.pct_change_20d,
    pct60d: input.pct_change_60d,
  }));
export type IndustryPctChange = z.infer<typeof IndustryPctChangeSchema>;

const IndustryPctChangesResponseSchema = z.array(IndustryPctChangeSchema);
type IndustryPctChangesResponse = z.infer<typeof IndustryPctChangesResponseSchema>;

export const marketRankScopes = ["stockpct", "industrypct"] as const;
export type MarketRankScope = (typeof marketRankScopes)[number];

export const getStockPctChange = async (authToken: string, signal?: AbortSignal) => {
  const url = new URL(`data/market/analysis?scope=stockpct`, DATA_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    signal,
  });
  return processResponse<StockPctChangeResponse>(response, StockPctChangeResponseSchema);
};

export const getIndustryPctChange = async (authToken: string, signal?: AbortSignal) => {
  const url = new URL(`data/market/analysis?scope=industrypct`, DATA_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    signal,
  });
  return processResponse<IndustryPctChangesResponse>(
    response,
    IndustryPctChangesResponseSchema,
  );
};
