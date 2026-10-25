import z from "zod";
import { DATA_URL, type DataServiceError } from "@/apis/shared";

const StockListSchema = z.array(z.array(z.string()));

const getStockList = async (authToken: string, signal?: AbortSignal) => {
  const url = new URL(`data/stock/list`, DATA_URL);
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
      `Failed to get stock list from server. Status ${response.status}`;
    throw new Error(errorMessage);
  }
  const responseData = await response.json();
  const parsedResult = StockListSchema.safeParse(responseData.data);
  if (parsedResult.success) {
    return parsedResult.data;
  }
  throw new Error(parsedResult.error.message);
};

export { getStockList };
