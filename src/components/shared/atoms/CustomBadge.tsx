import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/lib/utils";
import { Dot } from "lucide-react";
import { FC } from "react";

interface CustomBadgeProps {
  status?: UserStatus;
}
const CustomBadge: FC<CustomBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={`${
        status === UserStatus.approve
          ? "bg-[#F1FCF6] text-[#229745]"
          : "bg-[#D835350F] text-[#EB5757]"
      } hover:bg-default w-fit flex gap-2 items-center h-fit text-[1.2rem]`}
    >
      <Dot
      size={30}
        className={
          status === UserStatus.approve ? " text-[#229745]" : " text-[#EB5757]"
        }
      />

      {status === UserStatus.approve ? "Active" : " Inactive"}
    </Badge>
  );
};

export default CustomBadge;
