import type { OBVFeature } from "@/apis";
import {
  getBarGroupID,
  getLegendID,
  getLegendValueID,
  getLineID,
  toggleElement,
  updateTextValue,
} from "./d3-utils";
import { digitToPercent } from "@/lib/utils";

const obvIDPrefix = "obv";
const obvPressureFeatures = ["obv5", "obv20"] as const;
const obvMomentumFeatures = ["obvAccel520"] as const;

const toggleOBVElements = (featureName: string) => {
  toggleElement(getLegendID(obvIDPrefix, featureName), 0.3, 1.0);
  toggleElement(getLineID(obvIDPrefix, featureName));
  toggleElement(getBarGroupID(obvIDPrefix, featureName));
};

const updateIndicator = (feature: OBVFeature) => {
  obvPressureFeatures.forEach((featureName) => {
    updateTextValue(
      getLegendValueID(obvIDPrefix, featureName),
      digitToPercent(feature[featureName]),
    );
  });
  obvMomentumFeatures.forEach((featureName) => {
    updateTextValue(
      getLegendValueID(obvIDPrefix, featureName),
      feature[featureName].toFixed(2),
    );
  });
};

const updateOBVIndicators = ({
  features,
  xIdx,
}: {
  features: OBVFeature[];
  xIdx: number;
}) => {
  updateIndicator(features[xIdx]);
};

const resetOBVIndicators = ({ features }: { features: OBVFeature[] }) => {
  updateIndicator(features.at(-1)!);
};

export {
  obvPressureFeatures,
  obvMomentumFeatures,
  obvIDPrefix,
  toggleOBVElements,
  updateOBVIndicators,
  resetOBVIndicators,
};
