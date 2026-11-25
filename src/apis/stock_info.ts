import z from "zod";
import { DATA_URL, processResponse } from "@/apis/shared";

const StockInfoSchema = z
  .object({
    symbol: z.string(),
    company_name: z.string(),
    sector: z.string(),
    sub_industry: z.string(),
    headquarters: z.string(),
    founded: z.string(),
    price: z.float32(),
    pct_change: z.float32(),
  })
  .transform((input) => ({
    symbol: input.symbol,
    companyName: input.company_name,
    subIndustry: input.sub_industry,
    sector: input.sector,
    headquarters: input.headquarters,
    founded: input.founded,
    price: input.price,
    pctChange: input.pct_change,
  }));
type StockInfo = z.infer<typeof StockInfoSchema>;

const getStockInfo = async (symbol: string, authToken: string, signal?: AbortSignal) => {
  const url = new URL(`data/stock/info/${symbol}`, DATA_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    signal,
  });
  return processResponse<StockInfo>(response, StockInfoSchema);
};

export { getStockInfo };
