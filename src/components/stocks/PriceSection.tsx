import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { dataWindowParam, type DataWindowOpt } from "@/apis";
import { plotConfigAtom } from "@/atoms/plot";
import { getRouteApi } from "@tanstack/react-router";
import { usePlotSize } from "@/hooks/usePlotSize";
import { Section, Content, Header, Selections, Button } from "@/components/ui/Section";
import CandleIcon from "@/components/icons/CandleIcon";
import LineIcon from "@/components/icons/LineIcon";
import PriceValues from "@stocks/PriceValues";
import { priceChartTypes, type PriceChartType } from "@stocks/shared";
import StockDataPlot from "@stocks/plot/StockDataPlot";
import StockDataLegend from "./plot/StockDataLegends";

type PriceChartProps = {} & React.ComponentPropsWithoutRef<"div">;

const stockRoute = getRouteApi("/stocks/$symbol");

export default function PriceChart({ ...props }: PriceChartProps) {
  const { t } = useTranslation("stocks");
  const [chartType, setChartType] = useState<PriceChartType>("candle");
  const navigate = stockRoute.useNavigate();
  const window = stockRoute.useSearch({
    select: (search) => search.window,
  });

  const updateDataWindow = (nextWindow: DataWindowOpt) => {
    navigate({ to: ".", search: (previous) => ({ ...previous, window: nextWindow }) });
  };

  const { plotSize, plotContainerRef } = usePlotSize();
  const setPlotConfig = useSetAtom(plotConfigAtom);

  useEffect(
    () => setPlotConfig((prev) => ({ ...prev, referenceHeight: plotSize.height })),
    [plotSize.height, setPlotConfig],
  );

  return (
    <Section {...props}>
      <Header className="justify-between">
        <PriceValues />
        <div className="flex gap-7">
          <Selections className="border-l border-r">
            {priceChartTypes.map((currType) => (
              <Button
                key={`selector-button-${currType}`}
                active={chartType === currType}
                onClick={() => setChartType(currType)}
              >
                {currType === "line" ? <LineIcon /> : <CandleIcon />}
              </Button>
            ))}
          </Selections>
          {/* Data window selector */}
          <Selections className="border-l">
            {Object.entries(dataWindowParam).map(([key]) => (
              <Button
                key={`selector-button-${key}`}
                active={window === key}
                className={"w-11"}
                onClick={() => updateDataWindow(key as DataWindowOpt)}
              >
                {t(`stocks.${key}`)}
              </Button>
            ))}
          </Selections>
        </div>
      </Header>
      <Content className="flex-1">
        <div className="h-full flex flex-col">
          <div className="flex-1" ref={plotContainerRef}>
            <StockDataPlot
              chartType={chartType}
              width={plotSize.width}
              height={plotSize.height}
            />
          </div>
          <div>
            <StockDataLegend />
          </div>
        </div>
      </Content>
    </Section>
  );
}
