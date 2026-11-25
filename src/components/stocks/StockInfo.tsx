import { cn, digitToPercent } from "@/lib/utils";
import { stockRouteAPI } from "@/routes/stocks.$symbol";

export default function StockInfo() {
  const data = stockRouteAPI.useLoaderData({ select: (loaderData) => loaderData.info });
  const isUp = data && data.pctChange >= 0;
  return (
    <div className="w-full">
      {data && (
        <div className="flex h-10 items-center px-4">
          <div className="flex items-baseline gap-9">
            <div className="flex items-baseline gap-3">
              <h2 className="font-semibold text-lg">{data.companyName}</h2>
              <p className="text-sm">{data.symbol}</p>
            </div>
            <div className={"flex items-baseline gap-3"}>
              <p
                className={cn(
                  "font-semibold text-lg",
                  isUp ? "text-price-up" : "text-price-down",
                )}
              >
                ${data.price}
              </p>
              <p
                className={cn(
                  "text-sm font-semibold px-2 text-background",
                  isUp ? "bg-price-up" : "bg-price-down",
                )}
              >
                {digitToPercent(data.pctChange)}
              </p>
            </div>
            <div className="flex items-baseline gap-5 text-sm">
              <p>{data.headquarters}</p>
              <p>{data.sector}</p>
              <p>{data.subIndustry}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
