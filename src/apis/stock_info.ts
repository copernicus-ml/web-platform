import z from "zod";
import { DATA_URL, type DataServiceError } from "@/apis/shared";

const StockInfoSchema = z
  .object({
    symbol: z.string(),
    company_name: z.string(),
    sector: z.string(),
    sub_industry: z.string(),
    headquarters: z.string(),
    founded: z.string(),
  })
  .transform((input) => ({
    symbol: input.symbol,
    companyName: input.company_name,
    subIndustry: input.sub_industry,
    sector: input.sector,
    headquarters: input.headquarters,
    founded: input.founded,
  }));

const getStockInfo = async (symbol: string, authToken: string, signal?: AbortSignal) => {
  const url = new URL(`data/stock/info/${symbol}`, DATA_URL);
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
      `Failed to get ${symbol} stock info from server. Status ${response.status}`;
    throw new Error(errorMessage);
  }
  const responseData = await response.json();
  const parsedResult = StockInfoSchema.safeParse(responseData.data);
  if (parsedResult.success) {
    return parsedResult.data;
  }
  throw new Error(parsedResult.error.message);
};

export { getStockInfo };
