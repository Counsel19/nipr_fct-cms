import {
  Banknote,
  CalendarCog,
  CircleCheck,
  Clock8,
  Files,
  Home,
  Images,
  Power,
  Rss,
  ShieldCheck,
  ShieldQuestion,
  User,
} from "lucide-react";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Branding from "./atoms/Branding";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/auth/authSlice";

interface SideBarProps {}
const SideBar: FC<SideBarProps> = () => {
  const navigate = useNavigate();
  // const { logout } = useUser();

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const menuItems = [
    {
      title: "Dashboard",
      children: false,
      itemId: "/",
      icon: () => <Home size={20} />,
    },
    {
      title: "Membership",
      children: false,
      itemId: "/members",
      icon: () => <User size={20} />,
      subNav: [
        {
          title: "Pending",
          itemId: "/pending-members",

          elemBefore: () => <Clock8 size={20} />,
        },
        {
          title: "Approved",
          itemId: "/approved-members",

          elemBefore: () => <CircleCheck size={20} />,
        },
        {
          title: "Paid",
          itemId: "/paid-members",

          elemBefore: () => <Banknote size={20} />,
        },
        {
          title: "Active",
          itemId: "/active-members",

          elemBefore: () => <ShieldCheck size={20} />,
        },
        {
          title: "Inactive",
          itemId: "/inactive-members",

          elemBefore: () => <ShieldQuestion size={20} />,
        },
      ],
    },
    {
      title: "View News",
      children: false,
      itemId: "/news",
      icon: () => <Rss size={20} />,
    },

    {
      title: "Gallery",
      children: false,
      itemId: "/gallery",
      icon: () => <Images size={20} />,
    },

    {
      title: "Resources",
      children: false,
      itemId: "/resources",
      icon: () => <Files size={20} />,
    },
    {
      title: "Events",
      children: false,
      itemId: "/events",
      icon: () => <CalendarCog size={20} />,
    },
  ];

  return (
    <>
      <div className="w-full h-[76px] bg-[#F0F6FF] flex justify-center items-center">
        <Branding />
      </div>
      <div className="w-full">
        <div className="px-[8%] py-[8%] flex flex-col gap-12 text-base  ">
          {/* px-[20%] */}
          <Navigation
            activeItemId={location.pathname}
            onSelect={({ itemId }) => {
              navigate(itemId, { state: { title: "title" } });
              // handleClose()
            }}
            items={menuItems.map((list) => ({
              title: list?.title,
              itemId: list?.itemId,
              elemBefore: list?.icon,
              subNav: list.subNav,
            }))}
          />
        </div>
        <div className="mt-[2rem]">
          <Button variant={"outline"} onClick={() => dispatch(logout())}>
            <Power className="text-rose-500" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
