import { RootState } from "@/lib/redux/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

interface ProtectedRoutesProps {}
const ProtectedRoutes: FC<ProtectedRoutesProps> = () => {
  const { userProfile } = useSelector((store: RootState) => store.auth);
  return (
    <div>{userProfile ? <DashboardLayout /> : <Navigate to={"/login"} />}</div>
  );
};

export default ProtectedRoutes;
