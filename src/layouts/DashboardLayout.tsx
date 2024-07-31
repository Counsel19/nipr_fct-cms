import Header from "@/components/shared/molecules/Header";
import SideBar from "@/components/shared/Sidebar";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { SwipeableDrawer } from "@mui/material";

interface DashboardLayoutProps {}
const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  return (
    <div>
      <div className="flex w-full">
        <div className="lg:w-[20%] shadow-md lg:block hidden sticky top-0 h-screen bg-[#fff]">
          <SideBar />
        </div>
        <div className="lg:w-[80%] h-full">
          <header className="sticky top-0 border-none h-[76px] z-50 bg-[#fff] xl:px-6 lg:px-4 md:px-2 px-2">
            <Header setOpenMobileSidebar={setOpenMobileSidebar} />
          </header>
          <main className="h-auto bg-[#F8F8F8] ">
            {/* p-[2%]  */}
            <Outlet />
          </main>
        </div>
        <SwipeableDrawer
          anchor={"left"}
          open={openMobileSidebar}
          onClose={() => setOpenMobileSidebar(false)}
          onOpen={() => setOpenMobileSidebar(true)}
        >
          <div className="bg-background_white w-[320px] h-screen">
            <SideBar />
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
};

export default DashboardLayout;
