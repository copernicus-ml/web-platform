import { cn, digitToPercent } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Table, TBody, THead, TRow } from "../ui/Table";
import Triangle from "../icons/Triangle";
import { priceColors } from "@/lib/theme";
import type { IndustryPctChange, StockPctChange } from "@/apis";

type MarketTableProps = {
  headers: readonly string[];
  data: (StockPctChange | IndustryPctChange)[];
  widerColumns: string[];
} & React.ComponentProps<"table">;

export default function MarketTable({
  headers,
  data,
  widerColumns,
  ...props
}: MarketTableProps) {
  const { t } = useTranslation("market");

  const isNumber = (input: string | number | undefined) => {
    return typeof input === "number";
  };

  if (data.length === 0) {
    return <></>;
  }
  return (
    <Table {...props}>
      <THead>
        <TRow className="w-full h-full flex justify-between items-center divide-x">
          {headers.map((header) => (
            <th
              key={`thead-${header}`}
              className={cn(
                "font-base text-sm h-full leading-9 border-b border-gray-300",
                "first:flex-1",
                header === "subIndustry" ? "flex-5" : "flex-2",
              )}
            >
              {t(`table.${header}`)}
            </th>
          ))}
        </TRow>
      </THead>
      <TBody>
        {data.map((item, i) => (
          <TRow
            key={`tbody-row-${i}`}
            className="flex justify-between border-b last:border-none border-dashed border-gray-300 divide-x divide-gray-300 hover:bg-gray-100 transition-colors duration-100"
          >
            {Object.entries(item).map(([key, value], j) => (
              <td
                key={`row-${i}-${key}`}
                className={cn(
                  "py-2",
                  "first:flex-1",
                  widerColumns.includes(key) ? "flex-5" : "flex-2",
                  isNumber(value) && "text-center",
                )}
              >
                <div
                  className={cn(
                    "h-full w-full items-center flex",
                    isNumber(value) || j == 0 ? "justify-center gap-1" : "pl-3",
                  )}
                >
                  {isNumber(value) && (
                    <Triangle
                      className={cn("w-3 stroke-none z-0", value < 0 && "rotate-180")}
                      fill={value >= 0 ? priceColors.up : priceColors.down}
                    />
                  )}
                  <p>{isNumber(value) ? digitToPercent(value) : value}</p>
                </div>
              </td>
            ))}
          </TRow>
        ))}
      </TBody>
    </Table>
  );
}
