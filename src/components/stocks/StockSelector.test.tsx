import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StockSelector from "./StockSelector";

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  useLoaderData: vi.fn(),
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock("@/routes/stocks.$ticker", () => ({
  stockRouteAPI: {
    useLoaderData: mocks.useLoaderData,
    useNavigate: mocks.useNavigate,
    useParams: mocks.useParams,
  },
}));

const stockList = [
  ["AAPL", "Apple Inc."],
  ["MSFT", "Microsoft Corporation"],
  ["NVDA", "NVIDIA Corporation"],
];

describe("StockSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.useNavigate.mockReturnValue(mocks.navigate);
    mocks.useParams.mockReturnValue({ ticker: "AAPL" });
    mocks.useLoaderData.mockImplementation(({ select }) => select({ list: stockList }));
  });

  it("filters stocks by the entered ticker prefix", async () => {
    const user = userEvent.setup();
    render(
      <StockSelector>
        <button>Select stock</button>
      </StockSelector>,
    );
    await user.click(screen.getByRole("button", { name: "Select stock" }));
    await user.type(screen.getByRole("textbox"), "ms");
    expect(
      screen.getByRole("button", { name: /MSFT Microsoft Corporation/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /AAPL Apple Inc./ }),
    ).not.toBeInTheDocument();
  });

  it("navigates to the selected stock while preserving the search state", async () => {
    const user = userEvent.setup();
    render(
      <StockSelector>
        <button>Select stock</button>
      </StockSelector>,
    );
    await user.click(screen.getByRole("button", { name: "Select stock" }));
    await user.click(screen.getByRole("button", { name: /MSFT Microsoft Corporation/ }));
    expect(mocks.navigate).toHaveBeenCalledWith({
      to: ".",
      params: { ticker: "MSFT" },
      search: expect.any(Function),
    });

    const search = mocks.navigate.mock.calls[0][0].search;
    expect(search({ window: "60D", group: "pricemomentum" })).toEqual({
      window: "60D",
      group: "pricemomentum",
    });
  });
});
