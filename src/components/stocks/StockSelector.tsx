import { Content, Portal, Root, Trigger } from "@radix-ui/react-popover";
import SearchIcon from "@/components/icons/SearchIcon";
import { useState } from "react";
import clsx from "clsx";
import { stockRouteAPI, type StockSearchSchema } from "@/routes/stocks.$ticker";
import { cn } from "@/lib/utils";

const styles = {
  content: clsx(
    "origin-top flex flex-col gap-3 mt-1 h-96 rounded-md bg-white shadow-[0_2px_8px] border-gray-300 border shadow-gray-300 px-3 py-3 data-[state=open]:animate-[slideUp_200ms_ease-out] w-(--radix-popper-anchor-width)",
  ),
};

export default function StockSelector({
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  const [stockPrefix, setStockPrefix] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const navigate = stockRouteAPI.useNavigate();
  const { ticker: currTicker } = stockRouteAPI.useParams();
  const stockList = stockRouteAPI.useLoaderData({
    select: (loaderData) => loaderData.list,
  });

  const changeStock = (ticker: string) => {
    navigate({
      to: ".",
      params: { ticker: ticker },
      search: (previous) => previous as StockSearchSchema,
    });
  };

  const updateStockPrefix = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setStockPrefix(event.target.value.trim().toUpperCase());
  };
  const filteredList =
    stockPrefix === ""
      ? stockList
      : stockList?.filter((stock) => stock[0].startsWith(stockPrefix));

  return (
    <Root onOpenChange={setOpen} open={open}>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Content side="bottom" align="center" className={styles.content}>
          <div className="w-full flex items-center border gap-1 border-gray-300 rounded-sm px-2">
            <SearchIcon className="w-4 min-w-4" stroke="gray" />
            <input
              name={"stock search"}
              value={stockPrefix}
              onChange={updateStockPrefix}
              className="py-1 px-2 focus-visible:outline-0 text-sm"
              autoComplete="off"
            />
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thumb-gray-300 scrollbar-thin">
            {filteredList?.map((stock) => {
              return (
                <button
                  key={stock.join("-")}
                  className={cn(
                    "flex items-center p-1 px-1.5  hover:cursor-pointer hover:bg-gray-200 w-full rounded-sm",
                    currTicker === stock[0] ? "bg-gray-200 font-bold" : "",
                  )}
                  onClick={() => {
                    changeStock(stock[0]);
                    setOpen(false);
                  }}
                >
                  <p className="text-sm w-12.5 min-w-12.5 text-left">{stock[0]}</p>
                  <p className="text-xs text-gray-400 text-left tracking-tight">
                    {stock[1]}
                  </p>
                </button>
              );
            })}
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
