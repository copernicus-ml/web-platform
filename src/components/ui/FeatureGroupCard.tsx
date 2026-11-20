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
  const { t } = useTranslation("stocks");
  return (
    <div
      className={cn(
        "hover:cursor-pointer hover:bg-accent-200 px-4 transition-all duration-100 flex flex-col gap-1",
        "py-4",
        active && "bg-accent-200",
      )}
      onClick={onClick}
    >
      <h2
        className={cn(
          "flex items-end overflow-clip transition-all duration-100 text-[15px]",
          active && "font-bold",
        )}
      >
        {t(`featureGroupName.${featureGroup}`)}
      </h2>
      <div className="flex-1 leading-tight text-sm opacity-40 overflow-clip">
        <p>
          {active
            ? t(`featureGroupDescription.${featureGroup}`)
            : t(`featureGroupBrief.${featureGroup}`)}
        </p>
      </div>
    </div>
  );
}
