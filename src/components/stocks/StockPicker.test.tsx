import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StockPicker from "./StockPicker";

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  useLoaderData: vi.fn(),
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock("@/routes/stocks.$symbol", () => ({
  stockRouteAPI: {
    useLoaderData: mocks.useLoaderData,
    useNavigate: mocks.useNavigate,
    useParams: mocks.useParams,
  },
}));

vi.mock("@stocks/StockTrending", () => ({
  default: () => <></>,
}));

const stockList = [
  ["AAPL", "Apple Inc."],
  ["MSFT", "Microsoft Corporation"],
  ["NVDA", "NVIDIA Corporation"],
];

describe("StockPicker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.useNavigate.mockReturnValue(mocks.navigate);
    mocks.useParams.mockReturnValue({ symbol: "AAPL" });
    mocks.useLoaderData.mockImplementation(({ select }) => select({ list: stockList }));
  });

  it("filters stocks by the entered symbol prefix", async () => {
    const user = userEvent.setup();
    render(<StockPicker />);
    await user.type(screen.getByRole("textbox"), "ms");
    expect(
      screen.getByRole("button", { name: /MSFT Microsoft Corporation/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /AAPL Apple Inc./ }),
    ).not.toBeInTheDocument();
  });

  it("hide picker on textbox blur", async () => {
    const user = userEvent.setup();
    render(<StockPicker />);
    await user.click(screen.getByRole("textbox"));
    expect(
      screen.getByRole("button", { name: /NVDA NVIDIA Corporation/ }),
    ).toBeInTheDocument();
    await user.click(document.body);
    expect(
      screen.queryByRole("button", { name: /NVDA NVIDIA Corporation/ }),
    ).not.toBeInTheDocument();
  });

  it("navigates to the selected stock while preserving the search state", async () => {
    const user = userEvent.setup();
    render(<StockPicker />);
    await user.click(screen.getByRole("textbox"));
    await user.click(screen.getByRole("button", { name: /MSFT Microsoft Corporation/ }));
    expect(mocks.navigate).toHaveBeenCalledWith({
      to: ".",
      params: { symbol: "MSFT" },
      search: expect.any(Function),
    });

    const search = mocks.navigate.mock.calls[0][0].search;
    expect(search({ window: "60D", group: "pricemomentum" })).toEqual({
      window: "60D",
      group: "pricemomentum",
    });
  });
});
