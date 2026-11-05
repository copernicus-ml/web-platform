import { marketRankScopes } from "@/apis";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/market")({
  beforeLoad: () => {
    if (location.pathname.replaceAll("/", "") === "market") {
      throw redirect({
        to: "/market/rank",
        search: { scope: marketRankScopes[0] },
      });
    }
  },
  component: MarketLayout,
});

function MarketLayout() {
  return <Outlet />;
}
