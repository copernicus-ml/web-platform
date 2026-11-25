import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StockTrending from "./StockTrending";

const mocks = vi.hoisted(() => ({
  getToken: vi.fn(),
  useRouteContext: vi.fn(),
  query: vi.fn(),
  addFlashToast: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  useRouteContext: mocks.useRouteContext,
}));

vi.mock("@/router", () => ({
  queryClient: { query: mocks.query },
}));

vi.mock("@/components/ui/FlashToast", () => ({
  addFlashToast: mocks.addFlashToast,
}));

describe("StockTrending", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.getToken.mockResolvedValue("test-token");
    mocks.useRouteContext.mockImplementation(({ select }) =>
      select({ auth: { getToken: mocks.getToken } }),
    );
  });

  it("shows the top 10 daily movers and selects a stock on mouse down", async () => {
    mocks.query.mockResolvedValue(
      Array.from({ length: 11 }, (_, index) => ({
        symbol: "S" + (index + 1),
        companyName: "Stock " + (index + 1),
        pct1d: (index + 1) / 100,
      })),
    );
    const selectStock = vi.fn();
    render(<StockTrending currSymbol="S11" selectStock={selectStock} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(10);
    expect(buttons[0]).toHaveAccessibleName("S11 Stock 11 11.00%");
    expect(buttons[9]).toHaveAccessibleName("S2 Stock 2 2.00%");
    fireEvent.mouseDown(buttons[0]);
    expect(selectStock).toHaveBeenCalledWith("S11");
  });

  it("skips the query when no auth token is available", async () => {
    mocks.getToken.mockResolvedValue(null);
    await act(async () => {
      render(<StockTrending currSymbol="S11" selectStock={vi.fn()} />);
    });
    expect(mocks.getToken).toHaveBeenCalledOnce();
    expect(mocks.query).not.toHaveBeenCalled();
  });

  it("shows an error toast when the query rejects", async () => {
    mocks.query.mockRejectedValue(new Error("Request failed"));
    render(<StockTrending currSymbol="S11" selectStock={vi.fn()} />);
    await waitFor(() => {
      expect(mocks.addFlashToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Failed to get stock day runners",
          description: "Error: Request failed",
          type: "error",
        }),
      );
    });
  });
});
