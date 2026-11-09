import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cn, digitToPercent } from "@/lib/utils";
import { Table, TBody, THead, TRow } from "@/components/ui/Table";
import Triangle from "@/components/icons/Triangle";
import Arrow from "@/components/icons/Arrow";
import { priceColors } from "@/lib/theme";
import {
  sortableFields,
  type IndustryPctChange,
  type SortableField,
  type StockPctChange,
} from "@/apis";

type SortOptions = {
  field: SortableField;
  priority: "highest" | "lowest";
};
type MarketTableProps = {
  headers: readonly string[];
  rank: (StockPctChange | IndustryPctChange)[];
  widerColumns: string[];
} & React.ComponentProps<"table">;

const sortableFieldsSet = new Set(sortableFields.map((field) => field as string));

export default function MarketTable({
  headers,
  rank,
  widerColumns,
  ...props
}: MarketTableProps) {
  const { t } = useTranslation("market");
  const navigate = useNavigate();

  const isNumber = (input: string | number | undefined) => {
    return typeof input === "number";
  };

  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "pct1d",
    priority: "highest",
  });

  const updateSortOptions = (field: string) => {
    if (!sortableFieldsSet.has(field)) return;
    setSortOptions((prev) => {
      const newOptions = { ...prev };
      if (field === prev.field) {
        newOptions.priority = prev.priority === "highest" ? "lowest" : "highest";
      } else {
        newOptions.field = field as SortableField;
        newOptions.priority = "highest";
      }
      return newOptions;
    });
  };

  const navigateToStock = (column: string, value: string | number) => {
    if (column !== "ticker" || isNumber(value)) return;
    navigate({ to: `/stocks/${value}` });
  };

  const sortedRank = useMemo(() => {
    const { field, priority } = sortOptions;
    const dataSize = rank.length;
    return rank
      .sort((a, b) => (b[field] - a[field]) * (priority === "highest" ? 1 : -1))
      .map((data, i) => ({
        rank: `${priority === "highest" ? i + 1 : dataSize - i}`,
        ...data,
      }));
  }, [sortOptions, rank]);

  return (
    <Table {...props}>
      <THead className="**:transition-all **:duration-100">
        <TRow className="w-full h-full flex justify-between items-center divide-x">
          {headers.map((header) => (
            <th
              key={`thead-${header}`}
              className={cn(
                "font-base text-sm h-full leading-9 border-b border-accent-300 first:flex-1",
                header === "subIndustry" ? "flex-5" : "flex-2",
                header === sortOptions.field && "bg-accent-300",
                sortableFieldsSet.has(header) &&
                  "hover:cursor-pointer hover:bg-accent-300",
              )}
              onClick={() => updateSortOptions(header)}
            >
              <div className="flex w-full justify-center items-center gap-1">
                <p>{t(`table.${header}`)}</p>
                {header === sortOptions.field && (
                  <Arrow
                    className={cn(
                      "w-5 duration-100",
                      sortOptions.priority === "highest" ? "rotate-180" : "rotate-0",
                    )}
                  />
                )}
              </div>
            </th>
          ))}
        </TRow>
      </THead>
      <TBody>
        {sortedRank.map((item, i) => (
          <TRow
            key={`tbody-row-${i}`}
            className={cn(
              "flex justify-between",
              "border-b last:border-none border-dashed border-accent-300 divide-x divide-accent-300 hover:bg-accent-100",
            )}
          >
            {Object.entries(item).map(([key, value], j) => (
              <td
                key={`row-${i}-${key}`}
                className={cn(
                  "py-2",
                  "first:flex-1",
                  widerColumns.includes(key) ? "flex-5" : "flex-2",
                  isNumber(value) && "text-center",
                  key === "ticker" &&
                    "hover:cursor-pointer hover:bg-accent-300 hover:font-bold hover:underline",
                )}
                onClick={() => navigateToStock(key, value)}
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
