import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MarketTable from "./MarketTable";

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: mocks.useNavigate,
}));

const rank = [
  {
    ticker: "AAPL",
    subIndustry: "Consumer Electronics",
    pct1d: 0.01,
    pct5d: 0.04,
    pct10d: 0.03,
    pct20d: 0.04,
    pct60d: -0.05,
  },
  {
    ticker: "MSFT",
    subIndustry: "Systems Software",
    pct1d: 0.02,
    pct5d: 0.03,
    pct10d: -0.04,
    pct20d: 0.05,
    pct60d: 0.06,
  },
];

const headers = ["rank", "ticker", "subIndustry", "pct1d", "pct5d"];

describe("MarketTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.useNavigate.mockReturnValue(mocks.navigate);
  });

  it("sorts rows by the selected percentage column", async () => {
    const user = userEvent.setup();
    render(
      <MarketTable headers={headers} rank={[...rank]} widerColumns={["subIndustry"]} />,
    );
    let rows = screen.getAllByRole("row");
    expect(within(rows[1]).getByText("MSFT")).toBeInTheDocument();
    await user.click(screen.getByRole("columnheader", { name: "1 Day" }));
    rows = screen.getAllByRole("row");
    expect(within(rows[1]).getByText("AAPL")).toBeInTheDocument();
  });

  it("sorts rows by the other percentage column", async () => {
    const user = userEvent.setup();
    render(
      <MarketTable headers={headers} rank={[...rank]} widerColumns={["subIndustry"]} />,
    );
    const button5Days = screen.getByRole("columnheader", { name: "5 Days" });
    await user.click(button5Days);
    let rows = screen.getAllByRole("row");
    expect(within(rows[1]).getByText("AAPL")).toBeInTheDocument();
    await user.click(button5Days);
    rows = screen.getAllByRole("row");
    expect(within(rows[1]).getByText("MSFT")).toBeInTheDocument();
  });

  it("navigates to a stock when its ticker is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MarketTable headers={headers} rank={[...rank]} widerColumns={["subIndustry"]} />,
    );
    await user.click(screen.getByText("MSFT"));
    expect(mocks.navigate).toHaveBeenCalledWith({ to: "/stocks/MSFT" });
  });
});
