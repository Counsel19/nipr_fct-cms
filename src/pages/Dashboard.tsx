import SummaryCard from "@/components/dashboard/SummaryCard";
import { CircleUser } from "lucide-react";
import { FC } from "react";

interface DashboardProps {}
const Dashboard: FC<DashboardProps> = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-2 gap-12">
        <SummaryCard
          index={1}
          icon={<CircleUser />}
          title="Request "
          value={1}
        />
        <SummaryCard index={2} icon={<CircleUser />} title="News " value={1} />
        <SummaryCard index={3} icon={<CircleUser />} title="Blogs " value={1} />
        <SummaryCard
          index={4}
          icon={<CircleUser />}
          title="Resources "
          value={1}
        />
      </div>
    </div>
  );
};

export default Dashboard;
