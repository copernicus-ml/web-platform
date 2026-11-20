import { cn, computePriceChange, parseVolume } from "@/lib/utils";
import { stockRouteAPI } from "@/routes/stocks.$symbol";
import { priceElementIds } from "./plot/interactions/price-trend";
import type { StockPrice } from "@/apis";

const valueItems: { label: string; id: string; fieldName: keyof StockPrice }[] = [
  { label: "O", id: priceElementIds.valuesOpen, fieldName: "open" },
  { label: "H", id: priceElementIds.valuesHigh, fieldName: "high" },
  { label: "L", id: priceElementIds.valuesLow, fieldName: "low" },
  { label: "C", id: priceElementIds.valuesClose, fieldName: "close" },
  { label: "V", id: priceElementIds.valuesVol, fieldName: "volume" },
];

export default function PriceValues() {
  const prices = stockRouteAPI.useLoaderData({
    select: (loaderData) => loaderData.prices,
  });
  const isUp = (prices.at(0)?.close ?? 0) <= (prices.at(-1)?.close ?? 0);
  const priceChange = computePriceChange(prices.at(0)?.close, prices.at(-1)?.close);

  return (
    <div className="h-full flex gap-2.5 text-sm">
      <div
        id={priceElementIds.valuesPctRect}
        className={cn(
          "h-full w-30 font-bold text-white flex items-center justify-center gap-2",
          isUp ? "bg-price-up" : "bg-price-down",
        )}
      >
        <p id={priceElementIds.valuesPctChange}>{priceChange}</p>
      </div>
      {valueItems.map((item) => {
        if (!prices.at(-1)) return <></>;
        let val = prices.at(-1)![item.fieldName];
        if (item.label === "V") val = parseVolume(val as number);
        return (
          <div
            key={item.id}
            className="flex justify-center items-center text-xs gap-1 w-14"
          >
            <p className="text-accent-400">{item.label}</p>
            <p id={item.id}>{val}</p>
          </div>
        );
      })}
    </div>
  );
}
