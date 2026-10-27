import { FeatureGroups, type FeatureGroupOpt } from "@/apis";
import FeatureGroupCard from "@/components/ui/FeatureGroupCard";
import { cn } from "@/lib/utils";
import { stockRouteAPI } from "@/routes/stocks.$ticker";
import { useEffect, useRef } from "react";

export default function FeatureGroupSidebar() {
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
    <div className="w-full h-full bg-white rounded-md border-gray-300 border flex flex-col">
      <div className="h-10 flex justify-center items-center border-b border-gray-300">
        <h2 className="text-sm">Feature Group</h2>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div ref={sidebarRef} className="h-full overflow-y-auto scrollbar-none">
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
            "data-[pos=top]:bg-[linear-gradient(transparent_0%,transparent_80%,white_100%)]",
            "data-[pos=between]:bg-[linear-gradient(white_0%,transparent_20%,transparent_80%,white_100%)]",
            "data-[pos=bottom]:bg-[linear-gradient(white_0%,transparent_20%,transparent_100%)]",
          )}
        />
      </div>
    </div>
  );
}
