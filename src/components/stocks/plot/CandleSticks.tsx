import type { StockPrice } from "@/apis";
import { priceColors } from "@/lib/theme";

type CandleStickProps = {
  prices: StockPrice[];
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
};

export default function CandleStick({ prices, x, y }: CandleStickProps) {
  return (
    <g>
      {prices.map((price) => {
        const xCoord = x(price.date) ?? 0;
        const isUp = price.close > price.open;
        const color = isUp ? priceColors.up : priceColors.down;
        const top = y(Math.max(price.close, price.open));
        const height = Math.abs(y(price.close) - y(price.open));
        return (
          <g key={`candle-${price.date}`}>
            <line
              x1={xCoord + x.bandwidth() / 2}
              x2={xCoord + x.bandwidth() / 2}
              y1={y(price.high)}
              y2={y(price.low)}
              stroke={color}
            />
            <rect x={xCoord} y={top} width={x.bandwidth()} height={height} fill={color} />
          </g>
        );
      })}
    </g>
  );
}
