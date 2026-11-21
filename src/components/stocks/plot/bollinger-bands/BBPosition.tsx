import { bbIDPrefix, positionFeature } from "@stocks/plot/interactions/bollinger-bands";
import type { SubplotProps } from "@/components/stocks/shared";
import { colorPalette, plotSizeConfig, priceColors, svgConfig } from "@/lib/theme";
import YAxis from "@/components/ui/YAxis";
import { getLineID, getPaths, getYScale } from "@stocks/plot/interactions/d3-utils";
import ShadeRegion from "@/components/ui/ShadeRegion";

export default function BBPosition({
  features,
  width,
  height,
  x,
}: SubplotProps<"bollingerbands">) {
  const { strokeWidth } = svgConfig;
  const { marginTop, marginBottom } = plotSizeConfig;
  const values = features.map((feature) => feature[positionFeature]);
  const y = getYScale(values, height - marginBottom, marginTop);
  const path = getPaths<"bollingerbands">(features, [positionFeature], x, y)[
    positionFeature
  ];
  if (!path) return <></>;
  return (
    <>
      <YAxis y={y} width={width} labelFormatter={(value) => value.toFixed(1)} />
      {/* Bollinger Band boundaries */}
      <ShadeRegion
        x={x}
        y={y}
        upper={1.0}
        lower={0.0}
        center={0.5}
        upperColor={priceColors.up}
        lowerColor={priceColors.down}
      />
      {/* position feature */}
      <path
        id={getLineID(bbIDPrefix, positionFeature)}
        d={path}
        fill="none"
        strokeWidth={strokeWidth}
        stroke={colorPalette[2]}
      />
    </>
  );
}
