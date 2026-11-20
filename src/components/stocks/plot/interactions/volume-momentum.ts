import type { StockPrice, VolumeMomentumFeature } from "@/apis";
import {
  getBarGroupID,
  getLegendID,
  getLegendValueID,
  getLineID,
  toggleElement,
  updateTextValue,
} from "./d3-utils";
import { digitToPercent } from "@/lib/utils";

const volBiasFeatures = ["vol5Bias", "vol10Bias", "vol20Bias", "vol60Bias"] as const;
const volChangesFeatures = [
  "vol5Change",
  "vol10Change",
  "vol20Change",
  "vol60Change",
] as const;
const volMARatioFeatures = ["volMARatio510", "volMARatio1020", "volMARatio2060"] as const;

const vmIDPrefix = "volume-momentum";

const toggleVolumeFeature = (featureName: string) => {
  toggleElement(getBarGroupID(vmIDPrefix, featureName));
  toggleElement(getLegendID(vmIDPrefix, featureName), 0.3, 1.0);
  toggleElement(getLineID(vmIDPrefix, featureName));
};

const updateIndicator = (feature: VolumeMomentumFeature) => {
  const currFeature = feature;
  [...volBiasFeatures, ...volChangesFeatures].forEach((featureName) => {
    updateTextValue(
      getLegendValueID(vmIDPrefix, featureName),
      digitToPercent(currFeature[featureName]),
    );
  });
  volMARatioFeatures.forEach((featureName) => {
    updateTextValue(
      getLegendValueID(vmIDPrefix, featureName),
      currFeature[featureName].toFixed(2),
    );
  });
};

const updateVolumeIndicators = ({
  features,
  xIdx,
}: {
  prices: StockPrice[];
  features: VolumeMomentumFeature[];
  xIdx: number;
}) => {
  updateIndicator(features[xIdx]);
};

const resetVolumeIndicators = ({
  features,
}: {
  prices: StockPrice[];
  features: VolumeMomentumFeature[];
}) => {
  updateIndicator(features.at(-1)!);
};

export {
  volBiasFeatures,
  volChangesFeatures,
  volMARatioFeatures,
  vmIDPrefix,
  updateVolumeIndicators,
  toggleVolumeFeature,
  resetVolumeIndicators,
};
