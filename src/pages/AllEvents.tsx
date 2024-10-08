import EventsTableBody from "@/components/events/EventsTableBody";
import ConfirmationDialog from "@/components/shared/molecules/ConfirmationDialog";
import CustomTable from "@/components/shared/molecules/CustomTable";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  deleteEvent,
  fetchAllEvents,
} from "@/lib/redux/slices/events/eventsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface AllEventsProps {}
const AllEvents: FC<AllEventsProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen } = useSelector((store: RootState) => store.dialog);

  const { allEvents, singleEvent } = useSelector(
    (store: RootState) => store.event
  );

  useEffect(() => {
    const getData = () => {
      try {
        dispatch(fetchAllEvents());
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaginationChange = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const confirmModal = async () => {
    if (!singleEvent) return;
    try {
      const res = await dispatch(deleteEvent(singleEvent.id));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });

      await dispatch(fetchAllEvents());
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Deleting Events",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Deleting Events",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8 space-y-20">
      <div className="flex justify-between items-center">
        <div />

        <Link to={"/events/new"} className={cn(buttonVariants({}))}>
          <Plus />
          Create Event
        </Link>
      </div>
      <CustomTable
        tableBody={<EventsTableBody />}
        headingList={eventTableHeading}
        numberOfPages={allEvents ? allEvents.length : 0}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />

      {isOpen && <ConfirmationDialog confirmModal={confirmModal} />}
    </div>
  );
};

const eventTableHeading = [
  {
    text: "Poster Image",
  },
  {
    text: "Title",
  },
  {
    text: "Location",
  },
  {
    text: "Start ",
  },
  {
    text: "End ",
  },

  {
    text: "Type",
  },

  {
    text: "",
  },
];

export default AllEvents;

/* 

 <div className="flex gap-3 items-center mb-[11px]">
          <div className="w-full bg-[#F8F8FA] flex items-center gap-[10px] p-2  rounded-lg">
            <Search className="w-[24px] h-[24px] text-[#9A9AA6]" />
            <input
              name="search"
              placeholder="Search"
              className="outline-none w-full font-hanken p-3 bg-transparent text-[#8B8B8B] text-[11px]"
            />
          </div>
          <button className="text-[#fff] font-inter text-base w-[102px] h-[40px] bg-[#263238] rounded-lg">
            Search
          </button>
        </div>

*/
