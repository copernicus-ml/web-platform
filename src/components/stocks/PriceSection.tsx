import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { dataWindowParam, type DataWindowOpt } from "@/apis";
import { plotConfigAtom } from "@/atoms/plot";
import { usePlotSize } from "@/hooks/usePlotSize";
import { Section, Content, Header, Selections, Button } from "@/components/ui/Section";
import StockDataPlot from "@stocks/plot/StockDataPlot";
import CandleIcon from "@/components/icons/CandleIcon";
import LineIcon from "@/components/icons/LineIcon";
import { getRouteApi } from "@tanstack/react-router";
import { priceChartTypes, type PriceChartType } from "@/components/stocks/shared";
import PriceValues from "@/components/stocks/PriceValues";

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
      <Content ref={plotContainerRef} className="flex-1">
        <StockDataPlot
          chartType={chartType}
          width={plotSize.width}
          height={plotSize.height}
        />
      </Content>
    </Section>
  );
}
