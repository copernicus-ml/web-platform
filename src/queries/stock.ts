import {
  getStockFeatures,
  getStockInfo,
  getStockList,
  getStockPrices,
  type DataWindowOpt,
  type FeatureGroupOpt,
  getIndustryPctChange,
  getStockPctChange,
} from "@/apis";
import { queryOptions } from "@tanstack/react-query";

const stockInfoQuery = (symbol: string, authToken: string) => {
  return queryOptions({
    queryKey: ["stock", symbol, "info"],
    queryFn: async ({ signal }) => {
      return getStockInfo(symbol, authToken, signal);
    },
    staleTime: Infinity,
  });
};

const stockPriceQuery = (symbol: string, window: DataWindowOpt, authToken: string) => {
  return queryOptions({
    queryKey: ["stock", symbol, "prices", window],
    queryFn: async ({ signal }) => {
      return getStockPrices(symbol, window, authToken, signal);
    },
    staleTime: Infinity,
  });
};

const stockFeatureQuery = (
  symbol: string,
  window: DataWindowOpt,
  featureGroup: FeatureGroupOpt,
  authToken: string,
) => {
  return queryOptions({
    queryKey: ["stock", symbol, "features", window, featureGroup],
    queryFn: ({ signal }) =>
      getStockFeatures(symbol, window, featureGroup, authToken, signal),
    staleTime: Infinity,
  });
};

const stockListQuery = (authToken: string) => {
  return queryOptions({
    queryKey: ["stock", "list"],
    queryFn: ({ signal }) => getStockList(authToken, signal),
    staleTime: Infinity,
  });
};

const stockPctChangeQuery = (authToken: string) => {
  return queryOptions({
    queryKey: ["market", "stockpct"],
    queryFn: ({ signal }) => getStockPctChange(authToken, signal),
    staleTime: Infinity,
  });
};

const industryPctChangeQuery = (authToken: string) => {
  return queryOptions({
    queryKey: ["market", "industrypct"],
    queryFn: ({ signal }) => getIndustryPctChange(authToken, signal),
    staleTime: Infinity,
  });
};

export {
  stockInfoQuery,
  stockListQuery,
  stockPriceQuery,
  stockFeatureQuery,
  stockPctChangeQuery,
  industryPctChangeQuery,
};
