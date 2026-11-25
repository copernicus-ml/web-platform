import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StockInfo from "./StockInfo";

const mocks = vi.hoisted(() => ({
  useLoaderData: vi.fn(),
}));

vi.mock("@/routes/stocks.$symbol", () => ({
  stockRouteAPI: {
    useLoaderData: mocks.useLoaderData,
  },
}));

vi.mock("@/components/stocks/StockSelector", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const stockInfo = {
  symbol: "AAPL",
  companyName: "Apple Inc.",
  sector: "Technology",
  subIndustry: "Consumer Electronics",
  founded: "1976",
  headquarters: "CA",
  pctChange: 0.04,
  price: 120,
};

describe("StockInfo", () => {
  beforeEach(() => {
    mocks.useLoaderData.mockImplementation(({ select }) => select({ info: stockInfo }));
  });

  it("renders stock information from the route API", () => {
    render(<StockInfo />);
    expect(screen.getByRole("heading", { name: "Apple Inc." })).toBeInTheDocument();
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("Consumer Electronics")).toBeInTheDocument();
    expect(screen.getByText("CA")).toBeInTheDocument();
    expect(screen.getByText("$120")).toBeInTheDocument();
    expect(screen.getByText("4.00%")).toBeInTheDocument();
  });

  it("renders no stock details when the route API has no info", () => {
    mocks.useLoaderData.mockImplementation(({ select }) => select({ info: undefined }));
    render(<StockInfo />);
    expect(screen.queryByText("Download Data")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
