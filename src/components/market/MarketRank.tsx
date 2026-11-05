import { marketrankRouteAPI } from "@/routes/market.rank";
import MarketTable from "./MarketTable";
import { Button, Content, Header, Section, Selections } from "../ui/Section";
import { marketRankScopes, type MarketRankScope } from "@/apis";
import { useTranslation } from "react-i18next";

export default function MarketRank() {
  const { t } = useTranslation("market");

  const rank = marketrankRouteAPI.useLoaderData({
    select: (loaderData) => (loaderData ? loaderData.rank : undefined),
  });
  const navigate = marketrankRouteAPI.useNavigate();

  const currScope = marketrankRouteAPI.useSearch({ select: (search) => search.scope });
  const switchRankScope = (scope: MarketRankScope) => {
    navigate({ to: ".", search: (previous) => ({ ...previous, scope }) });
  };

  let headers: string[] = [];
  // the rank filed does not come from db,
  // it is calculated based on the current conditions
  if (currScope === "stockpct") {
    headers = [
      "rank",
      "ticker",
      "subIndustry",
      "pct1d",
      "pct5d",
      "pct10d",
      "pct20d",
      "pct60d",
    ];
  }
  if (currScope === "industrypct") {
    headers = ["rank", "subIndustry", "pct1d", "pct5d", "pct10d", "pct20d", "pct60d"];
  }

  if (rank === undefined) {
    return <></>;
  }

  return (
    <Section className="w-full h-full flex flex-col">
      <Header title={"day runners"}>
        <Selections>
          {marketRankScopes.map((scope) => (
            <Button
              key={`market-rank-${scope}`}
              active={scope === currScope}
              className="min-w-32"
              onClick={() => switchRankScope(scope)}
            >
              {t(`controls.${scope}`)}
            </Button>
          ))}
        </Selections>
      </Header>
      <Content className="flex-1 w-full rounded-md border border-gray-300 overflow-y-auto scrollbar-thin p-0">
        <MarketTable
          headers={headers}
          rank={rank}
          widerColumns={["subIndustry"]}
          className="w-full flex-1 max-h-full"
        />
      </Content>
    </Section>
  );
}
