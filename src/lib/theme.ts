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

const plotSizeConfig = {
  marginTop: 10,
  marginRight: 0,
  marginBottom: 45,
  marginLeft: 40,
  yLabelAnchor: 5,
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
  rectCorner: 0,
};

export {
  markColor,
  priceColors,
  animationConfig,
  plotSizeConfig,
  svgConfig,
  colorPalette,
};
