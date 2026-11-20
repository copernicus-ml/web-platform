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

const animationConfig = {
  duration: 50,
};

const legendConfig = {
  top: 4,
  lineHeight: 16,
  fontSize: 13,
  rectCorner: 4,
  featureWidth: 96,
  featureWidthTighter: 50,
  featureWidthWider: 126,
  featureWidthWidest: 180,
  featureHeight: 22,
  featureGap: 10,
};

const plotSizeConfig = {
  marginTop: 35,
  marginRight: 5,
  marginBottom: 50,
  marginLeft: 45,
};

const svgConfig = {
  strokeWidth: 1.5,
  opacity: 0.7,
  strokeDasharray: "10 4",
  markStrokeWidth: 1.5,
  markStrokeDasharray: "6 4",
  shadeOpacity: 0.15,
  circleR: 5,
  circleStroke: 2,
};

export {
  priceColors,
  legendConfig,
  animationConfig,
  plotSizeConfig,
  svgConfig,
  colorPalette,
};
