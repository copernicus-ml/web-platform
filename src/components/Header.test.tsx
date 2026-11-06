import { render, screen } from "@testing-library/react";
import { vi, describe, beforeEach, it, expect } from "vitest";
import Header from "./Header";
import Languages from "./icons/Languages";

const mocks = vi.hoisted(() => ({
  useLocation: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  useLocation: mocks.useLocation,
  Link: ({ to, children, ...props }: { to: string } & React.ComponentProps<"div">) => {
    return (
      <div {...props}>
        <p>{to}</p>
        {children}
      </div>
    );
  },
}));

vi.mock("@clerk/react", () => ({
  SignOutButton: ({ children }: React.ComponentProps<"div">) => {
    return (
      <div>
        <p>signout</p>
        {children}
      </div>
    );
  },
}));

vi.mock("@/components/LanguageSelector", () => ({
  default: () => (
    <div>
      <p>language</p>
      <Languages />
    </div>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders header", () => {
    mocks.useLocation.mockReturnValue({ pathname: "/stocks" });
    render(<Header />);
    expect(screen.getByText("Stocks")).toBeInTheDocument();
    expect(screen.getByText("Market")).toBeInTheDocument();
    expect(screen.getByText("signout")).toBeInTheDocument();
    expect(screen.getByText("language")).toBeInTheDocument();
    expect(screen.getByText("/stocks")).toBeInTheDocument();
    expect(screen.getByText("/market")).toBeInTheDocument();
  });
});
