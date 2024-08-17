import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, UserStatus } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import { FC, ReactNode, useState } from "react";

interface OptsDropdownProps {
  options: {
    id: string;
    text: string;
    icon: ReactNode;
    btnOnclick: (selectedId: number) => void;
  }[];
  selectedId: number | null;
  status?: UserStatus;
  onClick: () => void;
}
const OptsDropdown: FC<OptsDropdownProps> = ({
  options,
  status,
  selectedId,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button onClick={onClick} variant={"ghost"}>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 rounded-3xl p-4">
        {options.map(function (optn, index) {
          if (optn.text === "Enable" || optn.text === "Disable") {
            if (
              (status === 1 && optn.text === "Disable") ||
              (status === 0 && optn.text === "Enable")
            ) {
              return (
                <Button
                  variant={"ghost"}
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    selectedId && optn.btnOnclick(selectedId);
                  }}
                  className={cn(
                    "flex gap-4 items-center justify-start w-full",
                    optn.text.startsWith("Enable")
                      ? "text-[#229745]"
                      : optn.text === "Disable"
                      ? "text-[#E61919]"
                      : "text-[#33363F]"
                  )}
                >
                  {optn.icon}
                  {optn.text}
                </Button>
              );
            }
          } else {
            return (
              <Button
                variant={"ghost"}
                key={index}
                onClick={() => {
                  setIsOpen(false);
                  selectedId && optn.btnOnclick(selectedId);
                }}
                className={cn(
                  "flex gap-4 items-center justify-start w-full",
                  optn.text === "Delete" ? "text-[#E61919]" : "text-[#33363F]"
                )}
              >
                {optn.icon}
                {optn.text}
              </Button>
            );
          }

          return null;
        })}
      </PopoverContent>
    </Popover>
  );
};

export default OptsDropdown;
