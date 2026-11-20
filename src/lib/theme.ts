const priceColors = {
  up: "var(--color-price-up)",
  down: "var(--color-price-down)",
};

const colorPalette = [
  "var(--color-purple)",
  "var(--color-yellow)",
  "var(--color-blue)",
  "var(--color-red)",
];

const markColor = "var(--color-mark)";

const animationConfig = {
  duration: 50,
};

const legendConfig = {
  top: 4,
  lineHeight: 16,
  fontSize: 13,
  rectCorner: 0,
  featureWidth: 96,
  featureWidthTighter: 50,
  featureWidthWider: 126,
  featureWidthWidest: 180,
  featureHeight: 22,
  featureGap: 10,
};

const plotSizeConfig = {
  marginTop: 5,
  marginRight: 5,
  marginBottom: 50,
  marginLeft: 45,
};

const svgConfig = {
  strokeWidth: 1.3,
  opacity: 0.7,
  strokeDasharray: "10 4",
  markStrokeWidth: 1.3,
  markStrokeDasharray: "6 4",
  shadeOpacity: 0.15,
  circleR: 4,
  circleStroke: 2,
};

export {
  markColor,
  priceColors,
  legendConfig,
  animationConfig,
  plotSizeConfig,
  svgConfig,
  colorPalette,
};
