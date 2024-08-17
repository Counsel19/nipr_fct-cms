import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import CustomLoader from "../shared/atoms/CustomLoader";

const colors = [
  "bg-purple-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-fuchsia-100",
  "bg-teal-100",
  "bg-teal-100",
  "bg-cyan-100",
  "bg-yellow-100",
  "bg-violet-100",
];
const iconColor = [
  "bg-purple-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-fuchsia-500",
  "bg-teal-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-yellow-500",
  "bg-violet-500",
];

interface SummaryCardProps {
  icon: ReactNode;
  value?: number;
  title: string;
  index: number;
}
const SummaryCard: FC<SummaryCardProps> = ({
  icon,
  value,
  title,
  index,
}) => {
  const selectBg = () => {
    return colors[index];
  };
  const selectIconColor = () => {
    return iconColor[index];
  };
  return (
    <div
      className={cn(
        " min-h-[11.1rem] py-6 px-8 rounded-xl flex gap-8",
        selectBg()
      )}
    >
      <div
        className={cn(
          "p-4 w-fit h-fit rounded-full bg-purple-50 ",
          selectIconColor()
        )}
      >
        <div className="text-white">{icon}</div>
      </div>
      <div className="flex flex-col gap-4 text-start">
        {value != undefined || value != null  ? (
          <h5 className="text-[2rem] font-medium ">{value}</h5>
        ) : (
          <CustomLoader width={16} height={16} padding="p-0" />
        )}
        <h6 className="font-semibold text-base">{title}</h6>
      </div>
    </div>
  );
};

export default SummaryCard;
