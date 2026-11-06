import { SignOutButton } from "@clerk/react";
import ExitIcon from "./icons/ExitIcon";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import LanguageSelector from "@/components/LanguageSelector";
import Languages from "@/components/icons/Languages";
import clsx from "clsx";

const routes = [
  { path: "stocks", label: "Stocks", target: "/stocks" },
  { path: "market", label: "Market", target: "/market" },
];

const styles = {
  headerIcon: clsx(
    "my-auto w-6.5 h-6.5 p-1 stroke-gray-500 hover:stroke-black hover:cursor-pointer hover:bg-white rounded-sm transition-colors duration-100",
  ),
};

export default function Header() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="w-full flex items-center justify-center h-11 border-b border-gray-300 border-dashed">
      <div className="max-w-(--max-width) flex justify-between w-full h-full px-5 gap-10">
        <div className="h-full flex items-center gap-2">
          <img src="/favicon.svg" className="py-1 w-7 min-w-7" />
          <h2 className="font-bold text-lg">Copernicus</h2>
        </div>
        <div className="flex-1 flex h-full items-center gap-2 text-gray-500 text-sm">
          {routes.map((route) => (
            <Link
              key={`header-${route.label}`}
              to={route.target}
              className={cn(
                "px-3 py-2 rounded-sm hover:bg-white hover:cursor-pointer hover:text-black",
                "transition-colors duration-100",
                path.startsWith(route.target) && "font-bold text-black",
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="h-full flex items-center justify-end gap-3">
          <LanguageSelector>
            <Languages strokeWidth={1.5} className={styles.headerIcon} />
          </LanguageSelector>
          <SignOutButton>
            <ExitIcon className={styles.headerIcon} strokeWidth={1.8} />
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
