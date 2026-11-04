import { cn, digitToPercent } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Table, TBody, THead, TRow } from "../ui/Table";
import Triangle from "../icons/Triangle";
import { priceColors } from "@/lib/theme";

type MarketTableProps<T extends object> = {
  headers: readonly string[];
  data: readonly T[];
  widerColumns: string[];
} & React.ComponentProps<"table">;

export default function MarketTable<T extends object>({
  headers,
  data,
  widerColumns,
  ...props
}: MarketTableProps<T>) {
  const { t } = useTranslation("market");
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
                "font-base text-sm px-3 h-full leading-9 border-b border-gray-300",
                header === "subIndustry" ? "flex-2" : "flex-1",
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
            {Object.entries(item).map(([key, value]) => (
              <td
                key={`row-${i}-${key}`}
                className={cn(
                  "px-3 py-2",
                  widerColumns.includes(key) ? "flex-2" : "flex-1",
                  typeof value === "number" && "text-center",
                )}
              >
                <div
                  className={cn(
                    "h-full w-full items-center flex gap-1",
                    typeof value === "number" && "justify-center",
                  )}
                >
                  {typeof value === "number" && (
                    <Triangle
                      className={cn("h-3 stroke-none z-0", value < 0 && "rotate-180")}
                      fill={value >= 0 ? priceColors.up : priceColors.down}
                    />
                  )}
                  <p>{typeof value === "number" ? digitToPercent(value) : value}</p>
                </div>
              </td>
            ))}
          </TRow>
        ))}
      </TBody>
    </Table>
  );
}
