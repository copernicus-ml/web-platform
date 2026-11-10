import { FeatureGroups, type FeatureGroupOpt } from "@/apis";
import FeatureGroupCard from "@/components/ui/FeatureGroupCard";
import { cn } from "@/lib/utils";
import { stockRouteAPI } from "@/routes/stocks.$ticker";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function FeatureGroupSidebar() {
  const { t } = useTranslation("stocks");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const featureGroup = stockRouteAPI.useSearch({
    select: (search) => search.group,
  });
  const navigate = stockRouteAPI.useNavigate();

  const changeFeatureGroup = (nextFeatureGroup: FeatureGroupOpt) => {
    navigate({
      to: ".",
      search: (previous) => ({ ...previous, group: nextFeatureGroup }),
    });
  };

  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) {
      return;
    }
    const element = sidebarRef.current;
    const overlay = overlayRef.current;
    const checkScroll = () => {
      const scrollHeight = element.scrollHeight;
      const scrollTop = element.scrollTop;
      const clientHeight = element.clientHeight;
      const isTop = scrollTop === 0;
      const isBottom = scrollHeight === clientHeight + scrollTop;
      if (isTop) overlay.setAttribute("data-pos", "top");
      else if (isBottom) overlay.setAttribute("data-pos", "bottom");
      else if (!isTop && !isBottom) overlay.setAttribute("data-pos", "between");
    };
    checkScroll();
    element.addEventListener("scroll", checkScroll);
    return () => element.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="w-full h-full bg-background rounded-md border-accent-300 border flex flex-col">
      <div className="h-10 flex justify-center items-center border-b border-accent-300">
        <h2 className="text-sm">{t("ui.featuregroups")}</h2>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={sidebarRef}
          className="h-full overflow-y-auto scrollbar-none scroll-smooth divide-y divide-accent-300 last:rounded-b-md"
        >
          {FeatureGroups.map((group) => (
            <FeatureGroupCard
              key={`sidebar-${group}`}
              featureGroup={group}
              active={featureGroup === group}
              onClick={() => changeFeatureGroup(group)}
            />
          ))}
        </div>
        <div
          ref={overlayRef}
          className={cn(
            "absolute top-0 w-full h-full pointer-events-none opacity-70 rounded-md",
            "data-[pos=top]:bg-[linear-gradient(transparent_0%,transparent_80%,background_100%)]",
            "data-[pos=between]:bg-[linear-gradient(background_0%,transparent_20%,transparent_80%,background_100%)]",
            "data-[pos=bottom]:bg-[linear-gradient(background_0%,transparent_20%,transparent_100%)]",
          )}
        />
      </div>
    </div>
  );
}
