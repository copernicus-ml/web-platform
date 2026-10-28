import { FeatureSubplots, type FeatureGroupOpt } from "@/apis";
import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import FeaturesSection from "./FeaturesSection";
import i18n from "@/i18n/i18n";
import userEvent from "@testing-library/user-event";

const mocks = vi.hoisted(() => ({
  usePlotSize: vi.fn(),
  useSearch: vi.fn(),
}));

vi.mock("@/routes/stocks.$ticker", () => ({
  stockRouteAPI: {
    useSearch: mocks.useSearch,
  },
}));

vi.mock("@/hooks/usePlotSize", () => ({
  usePlotSize: mocks.usePlotSize,
}));

vi.mock("@stocks/plot/StockFeaturePlot", () => ({
  default: ({
    featureGroup,
    featureSubPlot,
    width,
    height,
  }: {
    featureGroup: FeatureGroupOpt;
    featureSubPlot: string;
    width: number;
    height: number;
  }) => (
    <div>
      <p>groupName: {featureGroup}</p>
      <p>subplotName: {featureSubPlot}</p>
      <p>width: {width}</p>
      <p>height: {height}</p>
    </div>
  ),
}));

vi.mock("@stocks/plot/dema/DEMAWindowSelector", () => ({
  default: () => <p>dema selector</p>,
}));

const defaultGroup: FeatureGroupOpt = "pricemomentum";
const defaultSubPlots = FeatureSubplots[defaultGroup];

describe("FeatureSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.useSearch.mockImplementation(({ select }) =>
      select({ group: "pricemomentum" }),
    );
    mocks.usePlotSize.mockReturnValue({
      plotSize: { width: 10, height: 10 },
      plotContainerRef: null,
    });
  });

  it("render correct components and subplot", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    defaultSubPlots.forEach((subplotName) => {
      const displayName = i18n.t(`subPlotName.${subplotName}`);
      expect(screen.getByRole("button", { name: displayName })).toBeInTheDocument();
    });
    expect(screen.getByText(`groupName: ${defaultGroup}`)).toBeInTheDocument();
    expect(screen.getByText(`subplotName: ${defaultSubPlots[0]}`)).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: i18n.t(`subPlotName.${defaultSubPlots[1]}`) }),
    );
    expect(screen.getByText(`subplotName: ${defaultSubPlots[1]}`)).toBeInTheDocument();
  });

  it("switch feature groups", async () => {
    const { rerender } = render(<FeaturesSection />);
    mocks.useSearch.mockImplementation(({ select }) => select({ group: "dema" }));
    rerender(<FeaturesSection />);
    expect(screen.getByText(`groupName: dema`)).toBeInTheDocument();
    expect(screen.getByText(`dema selector`)).toBeInTheDocument();
    expect(
      screen.getByText(`subplotName: ${FeatureSubplots["dema"][0]}`),
    ).toBeInTheDocument();
  });
});
