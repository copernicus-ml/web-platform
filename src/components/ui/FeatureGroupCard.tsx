import type { FeatureGroupOpt } from "@/apis";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type FeatureGroupCardProps = {
  featureGroup: FeatureGroupOpt;
  active?: boolean;
  onClick: () => void;
};

export default function FeatureGroupCard({
  featureGroup,
  onClick,
  active = false,
}: FeatureGroupCardProps) {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "hover:cursor-pointer hover:bg-gray-200 px-4 transition-all duration-100 flex flex-col gap-1",
        active ? "min-h-46 h-46 bg-gray-200" : "min-h-28 h-28",
        "last:rounded-b-sm",
      )}
      onClick={onClick}
    >
      <h2
        className={cn(
          "h-11 flex items-end overflow-clip transition-all duration-100",
          active && "font-bold",
        )}
      >
        {t(`featureGroupName.${featureGroup}`)}
      </h2>
      <div className="relative flex-1 leading-tight text-sm opacity-40 overflow-clip">
        <p className="absolute top-0">
          {active
            ? t(`featureGroupDescription.${featureGroup}`)
            : t(`featureGroupBrief.${featureGroup}`)}
        </p>
      </div>
    </div>
  );
}
