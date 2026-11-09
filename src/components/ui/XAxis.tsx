import { parseDate, getMonthName, cn } from "@/lib/utils";

type XAxisProps = {
  labels: string[];
  xPos: number;
  yPos: number;
  x: d3.ScaleBand<string>;
};

const LINE_HEIGHT = 16;

export default function XAxis({ labels, x, xPos, yPos }: XAxisProps) {
  return (
    <g transform={`translate(${xPos}, ${yPos})`} fontSize={12} className="select-none">
      {labels.map((d, i) => {
        let [showYear, showMonth] = [false, false];
        const [year, month, day] = parseDate(d);
        if (i > 0) {
          const [prevYear, prevMonth] = parseDate(labels[i - 1]);
          showMonth = month != prevMonth;
          showYear = year != prevYear;
        }
        return (
          <g key={d}>
            <text
              x={(x(d) ?? 0) + x.bandwidth() / 2}
              y={LINE_HEIGHT}
              textAnchor="middle"
              className="fill-accent-500"
            >
              {day}
            </text>
            {(showMonth || showYear) && (
              <text
                x={(x(d) ?? 0) + x.bandwidth() / 2}
                y={LINE_HEIGHT * 2}
                textAnchor="middle"
                fontWeight={showYear ? 600 : 400}
                className={cn(showYear ? "fill-primary" : "fill-accent-500")}
              >
                {showYear ? year : getMonthName(month)}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
