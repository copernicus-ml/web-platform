import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MarketRank from "./MarketRank";

const mocks = vi.hoisted(() => ({
  useLoaderData: vi.fn(),
  useNavigate: vi.fn(),
  useSearch: vi.fn(),
  navigate: vi.fn(),
}));

vi.mock("@/routes/market.rank", () => ({
  marketrankRouteAPI: {
    useLoaderData: mocks.useLoaderData,
    useNavigate: mocks.useNavigate,
    useSearch: mocks.useSearch,
  },
}));

vi.mock("./MarketTable", () => ({
  default: ({ headers }: { headers: string[] }) => (
    <div data-testid="market-table">{headers.join(",")}</div>
  ),
}));

describe("MarketRank", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.useNavigate.mockReturnValue(mocks.navigate);
    mocks.useLoaderData.mockImplementation(({ select }) => select({ rank: [] }));
    mocks.useSearch.mockImplementation(({ select }) => select({ scope: "stockpct" }));
  });

  it("does not render while rank data is unavailable", () => {
    mocks.useLoaderData.mockImplementation(({ select }) => select(undefined));
    const { container } = render(<MarketRank />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders stock columns and changes scope", async () => {
    const user = userEvent.setup();
    render(<MarketRank />);
    expect(screen.getByTestId("market-table")).toHaveTextContent(
      "rank,ticker,subIndustry,pct1d,pct5d,pct10d,pct20d,pct60d",
    );
    await user.click(screen.getByRole("button", { name: "By Subindustries" }));
    expect(mocks.navigate).toHaveBeenCalledWith({
      to: ".",
      search: expect.any(Function),
    });
    const search = mocks.navigate.mock.calls[0][0].search;
    // the original scope is "stockpct", the called scope is "industrypct"
    expect(search({ scope: "stockpct" })).toEqual({ scope: "industrypct" });
  });

  it("renders stock columns with industrypct scope", async () => {
    mocks.useSearch.mockImplementation(({ select }) => select({ scope: "industrypct" }));
    render(<MarketRank />);
    expect(screen.getByTestId("market-table")).toHaveTextContent(
      "rank,subIndustry,pct1d,pct5d,pct10d,pct20d,pct60d",
    );
  });
});
