import { stockRouteAPI, type StockSearchSchema } from "@/routes/stocks.$symbol";
import SearchIcon from "@/components/icons/SearchIcon";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function StockPicker() {
  const [keyword, setKeyword] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);

  const updateKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value.trim());
  };

  const stockList = stockRouteAPI.useLoaderData({
    select: (loaderData) => loaderData.list,
  });
  const { symbol: currSymbol } = stockRouteAPI.useParams();
  const navigate = stockRouteAPI.useNavigate();

  const filteredList = stockList.filter((item) => {
    let [symbol, name] = item;
    symbol = symbol.toLowerCase();
    name = name.toLowerCase();
    const prefix = keyword.toLowerCase();
    return symbol.startsWith(prefix) || name.startsWith(prefix);
  });

  const selectStock = (symbol: string) => {
    navigate({
      to: ".",
      params: { symbol: symbol },
      search: (previous) => previous as StockSearchSchema,
    });
  };

  return (
    <div className="min-w-70">
      <div className="w-full flex items-center gap-1 border-frame px-2 border-b border-dashed h-10">
        <SearchIcon className="w-4 min-w-4 stroke-accent-500" />
        <input
          name={"stock search"}
          value={keyword}
          onChange={updateKeyword}
          onFocus={() => setExpand(true)}
          onBlur={(e) => {
            if (e.relatedTarget === null) setExpand(false);
          }}
          className="py-1 px-2 focus-visible:outline-0 text-sm flex-1"
          autoComplete="off"
          placeholder="Symbol or company name"
        />
      </div>
      <div
        className={cn(
          expand ? "h-100 border-b border-frame border-dashed py-2" : "h-0",
          "px-1 transition-all duration-100 overflow-y-auto text-sm",
          "scrollbar-thumb-accent-300 scrollbar-thin",
        )}
      >
        {expand &&
          filteredList.length > 0 &&
          filteredList.map((item) => (
            <button
              key={`search-item-${item[0]}`}
              className={cn(
                "w-full flex text-left py-1 hover:cursor-pointer hover:bg-accent-100 px-2.5 items-center",
                item[0].toLowerCase() === currSymbol.toLowerCase() && "bg-accent-200",
              )}
              onClick={() => {
                selectStock(item[0]);
                setExpand(false);
              }}
            >
              <p className="flex-1 font-semibold">{item[0]}</p>
              <p className="flex-3 text-xs text-accent-500">{item[1]}</p>
            </button>
          ))}
        {expand && filteredList.length === 0 && (
          <p className="text-center mt-1">Unable to find any results</p>
        )}
      </div>
    </div>
  );
}
