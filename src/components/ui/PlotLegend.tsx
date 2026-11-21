import { colorPalette } from "@/lib/theme";
import { cn } from "@/lib/utils";

type PlotLegendProps = {
  legendId: string;
  valueId: string;
  index: number;
  label: string;
  value?: string;
  color?: string;
  opacity?: number | undefined;
  onClick?: () => void;
};

export default function PlotLegend({
  legendId,
  valueId,
  index,
  label,
  value,
  color,
  opacity,
  onClick,
}: PlotLegendProps) {
  const legendColor = color || colorPalette[index];
  const legendOpacity = opacity !== undefined ? opacity : 1.0;
  return (
    <div className="hover:bg-accent-100 hover:cursor-pointer hover:transition-colors hover:duration-100">
      <div
        id={legendId}
        className={"select-none flex gap-1 items-center text-[13px] px-4"}
        onClick={onClick}
      >
        <div
          className={cn("w-2 h-2 rounded-full")}
          style={{
            background: legendColor,
            opacity: legendOpacity,
          }}
        />
        <div className="flex gap-2">
          <p style={{ color: legendColor, opacity: legendOpacity }}>{label}</p>
          {value !== undefined && (
            <p id={valueId} className="text-primary">
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
