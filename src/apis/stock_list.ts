import z from "zod";
import { DATA_URL, processResponse } from "@/apis/shared";

const StockListSchema = z.array(z.array(z.string()));
type StockList = z.infer<typeof StockListSchema>;
// unverified
// const StocksPctChangesMapSchema = z.map(z.string(), z.float32());
// type StocksPctChangesMap = z.infer<typeof StocksPctChangesMapSchema>;

export const getStockList = async (authToken: string, signal?: AbortSignal) => {
  const url = new URL(`data/stock/list`, DATA_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    signal,
  });
  return processResponse<StockList>(response, StockListSchema);
};

// export const getStocksPctChanges = async (
//   symbols: string[],
//   authToken: string,
//   signal?: AbortSignal,
// ) => {
//   const queryString = symbols.join(",");
//   const url = new URL(`stocks/changes?symbols=${queryString}`, DATA_URL);
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//     signal,
//   });
//   return processResponse<StocksPctChangesMap>(response, StocksPctChangesMapSchema);
// };
