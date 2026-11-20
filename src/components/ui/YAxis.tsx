import { plotSizeConfig, svgConfig } from "@/lib/theme";

type YAxisProps = {
  y: d3.ScaleLinear<number, number>;
  width: number;
  labelPrefix?: string;
  labelPostfix?: string;
  labelFormatter?: (value: number) => string;
};

export default function YAxis({
  y,
  width,
  labelPrefix,
  labelPostfix,
  labelFormatter,
}: YAxisProps) {
  const { markStrokeDasharray } = svgConfig;
  return (
    <g fontSize={12} className="select-none">
      {y.ticks(6).map((tick) => (
        <g key={`stock-${tick}`}>
          <line
            x1={plotSizeConfig.marginLeft}
            x2={width - plotSizeConfig.marginRight}
            y1={y(tick)}
            y2={y(tick)}
            strokeDasharray={markStrokeDasharray}
            className="stroke-accent-300"
          />
          <text
            x={8}
            y={y(tick)}
            dy={"0.33em"}
            textAnchor="start"
            className="fill-accent-500"
          >
            {labelPrefix && labelPrefix}
            {labelFormatter ? labelFormatter(tick) : tick}
            {labelPostfix && labelPostfix}
          </text>
        </g>
      ))}
    </g>
  );
}
