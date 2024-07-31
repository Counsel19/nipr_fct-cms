import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC } from "react";
import UserAvatar from "../atoms/UserAvatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: FC<HeaderProps> = ({ setOpenMobileSidebar }) => {
  return (
    <div className="w-full h-full bg-[#fff] flex justify-between items-center">
      <div className="flex gap-3 ">
        <Button className="lg:hidden" onClick={() => setOpenMobileSidebar(true)}>
          <Menu />
        </Button>
      </div>
      <div className="flex gap-4 items-center mr-4 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} className="  flex gap-2 justify-center ">
              <UserAvatar imgUrl="" name="Admin" />
              <span>Admin</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 rounded-3xl p-4">
            <div>
              <Button variant={"ghost"}>Logout</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
