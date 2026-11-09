import { svgConfig } from "@/lib/theme";

type YAxisProps = {
  y: d3.ScaleLinear<number, number>;
  plotWidth: number;
  labelXOffset?: number;
  labelPrefix?: string;
  labelPostfix?: string;
  labelFormatter?: (value: number) => string;
};

export default function YAxis({
  y,
  plotWidth,
  labelXOffset,
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
            x1={0}
            x2={plotWidth}
            y1={y(tick)}
            y2={y(tick)}
            strokeDasharray={markStrokeDasharray}
            className="stroke-accent-300"
          />
          <text
            x={plotWidth + (labelXOffset ?? 0)}
            y={y(tick)}
            dy={"0.33em"}
            textAnchor="end"
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
