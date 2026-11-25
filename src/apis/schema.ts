import { z } from "zod";

export const dataWindows = ["60D", "90D", "180D", "1Y", "3Y"] as const;
export type DataWindowOpt = (typeof dataWindows)[number];

export const FeatureGroups = [
  "pricemomentum",
  "macd",
  "dema",
  "volumemomentum",
  "obv",
  "marketactivity",
  "volatility",
  "bollingerbands",
  "rsi",
  "kdj",
  "cci",
] as const;
export type FeatureGroupOpt = (typeof FeatureGroups)[number];

export const featureGroupParam: Record<FeatureGroupOpt, string> = {
  pricemomentum: "pricemomentum",
  volumemomentum: "volumemomentum",
  volatility: "volatility",
  obv: "obv",
  marketactivity: "marketactivity",
  bollingerbands: "bollingerbands",
  macd: "macd",
  dema: "dema",
  rsi: "rsi",
  kdj: "kdj",
  cci: "cci",
};

export const FeatureSubplots: Record<FeatureGroupOpt, string[]> = {
  pricemomentum: ["maBias", "return", "upDayRatio"] as const,
  volumemomentum: ["volumeBias", "volumeChanges", "volumeMARatio"] as const,
  volatility: ["logVolatility", "volatilityRank"] as const,
  obv: ["pressure", "momentum"] as const,
  marketactivity: ["activityScores", "priceAndTurnover", "amplitude"] as const,
  macd: ["acceleration"] as const,
  bollingerbands: ["position", "width"] as const,
  dema: ["spread"] as const,
  rsi: ["rsi"] as const,
  kdj: ["kdj"] as const,
  cci: ["cci"] as const,
};

export const dataWindowParam: Record<DataWindowOpt, string> = {
  "60D": "60days",
  "90D": "90days",
  "180D": "180days",
  "1Y": "1year",
  "3Y": "3years",
};

export const StockPriceSchema = z.object({
  symbol: z.string(),
  date: z.string(),
  open: z.float32(),
  close: z.float32(),
  high: z.float32(),
  low: z.float32(),
  volume: z.float32(),
  turnover: z.float32(),
});

export const PriceMomentumFeaturesSchema = z
  .object({
    date: z.string(),
    ma_5: z.float32(),
    ma_20: z.float32(),
    ma_60: z.float32(),
    ma_5_bias: z.float32(),
    ma_20_bias: z.float32(),
    ma_60_bias: z.float32(),
    return_5d: z.float32(),
    return_20d: z.float32(),
    return_60d: z.float32(),
    up_ratio_5d: z.float32(),
    up_ratio_20d: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    ma5: input.ma_5,
    ma20: input.ma_20,
    ma60: input.ma_60,
    ma5Bias: input.ma_5_bias,
    ma20Bias: input.ma_20_bias,
    ma60Bias: input.ma_60_bias,
    return5d: input.return_5d,
    return20d: input.return_20d,
    return60d: input.return_60d,
    upRatio5d: input.up_ratio_5d,
    upRatio20d: input.up_ratio_20d,
  }));

export const VolumeMomentumFeatureSchema = z
  .object({
    date: z.string(),
    vol_ma_5_bias: z.float32(),
    vol_change_5d: z.float32(),
    vol_ma_10_bias: z.float32(),
    vol_change_10d: z.float32(),
    vol_ma_20_bias: z.float32(),
    vol_change_20d: z.float32(),
    vol_ma_60_bias: z.float32(),
    vol_change_60d: z.float32(),
    vol_ma_5_10_ratio: z.float32(),
    vol_ma_10_20_ratio: z.float32(),
    vol_ma_20_60_ratio: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    vol5Bias: input.vol_ma_5_bias,
    vol5Change: input.vol_change_5d,
    vol10Bias: input.vol_ma_10_bias,
    vol10Change: input.vol_change_10d,
    vol20Bias: input.vol_ma_20_bias,
    vol20Change: input.vol_change_20d,
    vol60Bias: input.vol_ma_60_bias,
    vol60Change: input.vol_change_60d,
    volMARatio510: input.vol_ma_5_10_ratio,
    volMARatio1020: input.vol_ma_10_20_ratio,
    volMARatio2060: input.vol_ma_20_60_ratio,
  }));

export const VolatilitySchema = z
  .object({
    date: z.string(),
    volatility_log: z.float32(),
    volatility_rank: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    volatilityLog: input.volatility_log,
    volatilityRank: input.volatility_rank,
  }));

export const OBVFeatureSchema = z
  .object({
    date: z.string(),
    obv_strength_5: z.float32(),
    obv_strength_20: z.float32(),
    obv_strength_accel_5_20: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    obv5: input.obv_strength_5,
    obv20: input.obv_strength_20,
    obvAccel520: input.obv_strength_accel_5_20,
  }));

export const MarketActivityFeaturesSchema = z
  .object({
    date: z.string(),
    amplitude: z.float32(),
    amplitude_ma_5: z.float32(),
    amplitude_ma_20: z.float32(),
    activity_score_60: z.float32(),
    thin_trade_amplitude_score_60: z.float32(),
    turnover_without_move_score_60: z.float32(),
    amplitude_quantile_60: z.float32(),
    turnover_quantile_60: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    amplitude: input.amplitude,
    amplitudeMa5: input.amplitude_ma_5,
    amplitudeMa20: input.amplitude_ma_20,
    tradingActivityScore: input.activity_score_60,
    lowLiquidityVolatilityScore: input.thin_trade_amplitude_score_60,
    stagnantTurnoverScore: input.turnover_without_move_score_60,
    amplitudeQuantile: input.amplitude_quantile_60,
    turnoverQuantile: input.turnover_quantile_60,
  }));

export const MACDFeatureSchema = z
  .object({
    date: z.string(),
    macd_ema_slow: z.float32(),
    macd_ema_fast: z.float32(),
    macd_diff: z.float32(),
    macd_dea: z.float32(),
    macd_hist: z.float32(),
    macd_gold: z.int32(),
    macd_dead: z.int32(),
  })
  .transform((input) => ({
    date: input.date,
    emaSlow: input.macd_ema_slow,
    emaFast: input.macd_ema_fast,
    diff: input.macd_diff,
    hist: input.macd_hist,
    dea: input.macd_dea,
    gold: input.macd_gold,
    dead: input.macd_dead,
  }));

export const BollingerBandsFeaturesSchema = z
  .object({
    date: z.string(),
    bb_upper: z.float32(),
    bb_lower: z.float32(),
    bb_mid: z.float32(),
    bb_width: z.float32(),
    bb_position: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    bbUpper: input.bb_upper,
    bbLower: input.bb_lower,
    bbMid: input.bb_mid,
    bbWidth: input.bb_width,
    bbPos: input.bb_position,
  }));

export const DEMAPeriods = ["5_10", "10_20", "20_60"] as const;
export type DEMAPeriodOpt = (typeof DEMAPeriods)[number];
export const DEMAFeaturesSchema = z
  .object({
    date: z.string(),
    dema_5_10_fast: z.float32(),
    dema_10_20_fast: z.float32(),
    dema_20_60_fast: z.float32(),
    dema_5_10_slow: z.float32(),
    dema_10_20_slow: z.float32(),
    dema_20_60_slow: z.float32(),
    dema_5_10_spread: z.float32(),
    dema_10_20_spread: z.float32(),
    dema_20_60_spread: z.float32(),
    dema_5_10_gold: z.int(),
    dema_10_20_gold: z.int(),
    dema_20_60_gold: z.int(),
    dema_5_10_dead: z.int(),
    dema_10_20_dead: z.int(),
    dema_20_60_dead: z.int(),
  })
  .transform(({ date, ...input }) => ({
    date: date,
    ...input,
  }));

export const RSISchema = z
  .object({
    date: z.string(),
    rsi_6: z.float32(),
    rsi_14: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    rsi6: input.rsi_6,
    rsi14: input.rsi_14,
  }));

export const KDJSchema = z
  .object({
    date: z.string(),
    kdj_low_9: z.float32(),
    kdj_high_9: z.float32(),
    kdj_k: z.float32(),
    kdj_d: z.float32(),
    kdj_j: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    kdjHigh9: input.kdj_high_9,
    kdjLow9: input.kdj_low_9,
    kdjK: input.kdj_k,
    kdjD: input.kdj_d,
    kdjJ: input.kdj_j,
  }));

export const CCISchema = z
  .object({
    date: z.string(),
    tp: z.float32(),
    tp_sma: z.float32(),
    cci: z.float32(),
    cci_ma_5: z.float32(),
  })
  .transform((input) => ({
    date: input.date,
    tp: input.tp,
    tpSma: input.tp_sma,
    cci: input.cci,
    cciMa5: input.cci_ma_5,
  }));

export const FeatureSchemas = {
  pricemomentum: PriceMomentumFeaturesSchema,
  volumemomentum: VolumeMomentumFeatureSchema,
  volatility: VolatilitySchema,
  obv: OBVFeatureSchema,
  marketactivity: MarketActivityFeaturesSchema,
  macd: MACDFeatureSchema,
  bollingerbands: BollingerBandsFeaturesSchema,
  dema: DEMAFeaturesSchema,
  rsi: RSISchema,
  kdj: KDJSchema,
  cci: CCISchema,
} satisfies Record<FeatureGroupOpt, z.ZodType>;

export const sortableFields = ["pct1d", "pct5d", "pct10d", "pct20d", "pct60d"] as const;
export type SortableField = (typeof sortableFields)[number];

export type StockPrice = z.infer<typeof StockPriceSchema>;
export type PriceMomentumFeature = z.infer<typeof PriceMomentumFeaturesSchema>;
export type VolumeMomentumFeature = z.infer<typeof VolumeMomentumFeatureSchema>;
export type VolatilityFeature = z.infer<typeof VolatilitySchema>;
export type OBVFeature = z.infer<typeof OBVFeatureSchema>;
export type MarketActivityFeature = z.infer<typeof MarketActivityFeaturesSchema>;
export type MACDFeature = z.infer<typeof MACDFeatureSchema>;
export type BollingerBandsFeature = z.infer<typeof BollingerBandsFeaturesSchema>;
export type DEMAFeature = z.infer<typeof DEMAFeaturesSchema>;
export type RSIFeature = z.infer<typeof RSISchema>;
export type KDJFeature = z.infer<typeof KDJSchema>;
export type CCIFeature = z.infer<typeof CCISchema>;
export type FeatureByGroup = {
  pricemomentum: PriceMomentumFeature;
  volumemomentum: VolumeMomentumFeature;
  volatility: VolatilityFeature;
  obv: OBVFeature;
  marketactivity: MarketActivityFeature;
  macd: MACDFeature;
  bollingerbands: BollingerBandsFeature;
  dema: DEMAFeature;
  rsi: RSIFeature;
  kdj: KDJFeature;
  cci: CCIFeature;
};
