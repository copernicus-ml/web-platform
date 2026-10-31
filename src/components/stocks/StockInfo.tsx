import clsx from "clsx";
import { cn } from "@/lib/utils";
import StockSelector from "@/components/stocks/StockSelector";
import { stockRouteAPI } from "@/routes/stocks.$ticker";

const styles = {
  container: clsx(
    "box-border w-full h-16 grid grid-cols-3 items-center border border-gray-300 rounded-md overflow-hidden bg-white",
    "divide-x divide-gray-300",
  ),
  columnBasic: clsx(
    "w-full h-full px-5 flex flex-col justify-center transition duration-100 text-sm",
  ),
  columnDownloadSeparator: clsx("border-r h-full border-gray-300"),
};

export default function StockInfo() {
  const data = stockRouteAPI.useLoaderData({ select: (loaderData) => loaderData.info });
  return (
    <div className="w-full">
      <div className={styles.container}>
        {data && (
          <>
            <StockSelector>
              <div
                className={cn(
                  styles.columnBasic,
                  "cursor-pointer hover:bg-gray-200 col-span-1",
                )}
              >
                <h2 className="font-semibold text-lg">{data.ticker}</h2>
                <p>{data.companyName}</p>
              </div>
            </StockSelector>
            <div className={cn(styles.columnBasic, "col-span-1")}>
              <p>{data.sector}</p>
              <p>{data.subIndustry}</p>
            </div>
            <div className={cn(styles.columnBasic, "col-span-1")}>
              <p>founded in {data.founded}</p>
              <p>{data.headquarters}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
