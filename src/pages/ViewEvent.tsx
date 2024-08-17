import EventForm from "@/components/events/EventForm";
import CustomLoader from "@/components/shared/atoms/CustomLoader";
import { Button } from "@/components/ui/button";
import { fetchEventById } from "@/lib/redux/slices/events/eventsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowLeft } from "lucide-react";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface ViewEventProps {}
const ViewEvent: FC<ViewEventProps> = () => {
  const { isLoading, singleEvent } = useSelector(
    (store: RootState) => store.event
  );

  const { eventId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = () => {
      if (!eventId) return;
      try {
        eventId;
        dispatch(fetchEventById(eventId));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="space-y-12 p-8 grid items-start">
      <Button className="w-fit" onClick={() => navigate(-1)} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-3">
        <h4 className="leading-[3rem] text-[2.5rem]">View Event </h4>
        <p className="text-base text-slate-500">Manage Events Here</p>
      </div>
      {isLoading || !singleEvent ? (
        <div>
          <CustomLoader />{" "}
        </div>
      ) : (
        <EventForm input={singleEvent} />
      )}
    </div>
  );
};

export default ViewEvent;
