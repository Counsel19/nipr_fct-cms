import SummaryCard from "@/components/dashboard/SummaryCard";
import { fetchAllEvents } from "@/lib/redux/slices/events/eventsThunk";
import { fetchGallery } from "@/lib/redux/slices/gallery/galleryThunk";
import { fetchAllPendingMembers } from "@/lib/redux/slices/membershipManagement/membersManagementThunk";
import { fetchAllNewsPost } from "@/lib/redux/slices/news/newsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { CircleUser } from "lucide-react";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface DashboardProps {}
const Dashboard: FC<DashboardProps> = () => {
  const { pendingMembers } = useSelector(
    (store: RootState) => store.membershipManagement
  );
  const { allNewsPost } = useSelector((store: RootState) => store.newsPost);
  const { gallery } = useSelector((store: RootState) => store.gallery);
  const { allEvents } = useSelector((store: RootState) => store.event);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchAllPendingMembers());
        await dispatch(fetchAllNewsPost());
        await dispatch(fetchGallery());
        await dispatch(fetchAllEvents());
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="p-8">
      <div className="grid grid-cols-2 gap-12">
        <SummaryCard
          index={1}
          icon={<CircleUser />}
          title="Pending Request "
          value={pendingMembers?.length}
        />
        <SummaryCard
          index={2}
          icon={<CircleUser />}
          title="News "
          value={allNewsPost?.length}
        />
        <SummaryCard
          index={3}
          icon={<CircleUser />}
          title="Gallery Items "
          value={gallery?.length}
        />
        <SummaryCard
          index={4}
          icon={<CircleUser />}
          title="Events "
          value={allEvents?.length}
        />
      </div>
    </div>
  );
};

export default Dashboard;
