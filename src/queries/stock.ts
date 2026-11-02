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

const stockInfoQuery = (ticker: string, authToken: string) => {
  return queryOptions({
    queryKey: ["stock", ticker, "info"],
    queryFn: async ({ signal }) => {
      return getStockInfo(ticker, authToken, signal);
    },
    staleTime: Infinity,
  });
};

const stockPriceQuery = (ticker: string, window: DataWindowOpt, authToken: string) => {
  return queryOptions({
    queryKey: ["stock", ticker, "prices", window],
    queryFn: async ({ signal }) => {
      return getStockPrices(ticker, window, authToken, signal);
    },
    staleTime: Infinity,
  });
};

const stockFeatureQuery = (
  ticker: string,
  window: DataWindowOpt,
  featureGroup: FeatureGroupOpt,
  authToken: string,
) => {
  return queryOptions({
    queryKey: ["stock", ticker, "features", window, featureGroup],
    queryFn: ({ signal }) =>
      getStockFeatures(ticker, window, featureGroup, authToken, signal),
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
