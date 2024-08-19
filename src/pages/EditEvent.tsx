import EventForm from "@/components/events/EventForm";
import CustomLoader from "@/components/shared/atoms/CustomLoader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  fetchEventById,
  updateEvent,
  updateEventImage,
} from "@/lib/redux/slices/events/eventsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { INewEvent } from "@/types/event";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface EditEventProps {}
type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];
const EditEvent: FC<EditEventProps> = () => {
  const [event, setEvent] = useState<INewEvent>({
    title: "",
    description: "",
    location: "",
    poster_image: null,
    start_date: new Date(),
    end_date: new Date(),
    type: null,
    fee: "",
  });

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

  useEffect(() => {
    if (singleEvent) {
      setEvent({
        description: singleEvent.description,
        end_date: new Date(singleEvent.end_date),
        start_date: new Date(singleEvent.start_date),
        fee: singleEvent.fee || "",
        location: singleEvent.location,
        poster_image: singleEvent.poster_image as string,
        title: singleEvent.title,
        type: singleEvent.type,
      });
    }
  }, [singleEvent]);
  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setEvent({ ...event, [name]: value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setEvent({ ...event, [name]: value });
  };

  const handleUpdateEvent = async () => {
    try {
      const formData = new FormData();

      if (event.poster_image && typeof event.poster_image == "object") {
        formData.append("poster_image", event.poster_image);
        await dispatch(
          updateEventImage({ data: formData, eventId: eventId as string })
        );
      }

      const res = await dispatch(
        updateEvent({ payload: event, eventId: eventId as string })
      );

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Event has been Updated ",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Updating Event",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Updating Event",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-12 p-8 grid items-start">
      <Button className="w-fit" onClick={() => navigate(-1)} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-3">
        <h4 className="leading-[3rem] text-[2.5rem]">Edit Event </h4>
        <p className="text-base text-slate-500">Manage Events Here</p>
      </div>
      {isLoading || !singleEvent ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <EventForm
          input={event}
          handleOnchange={handleOnchange}
          setFile={(file: File) =>
            setEvent({
              ...event,
              poster_image: file,
            })
          }
          handleSelectChange={handleSelectChange}
          selectStartDate={(date: Value) =>
            setEvent({
              ...event,
              start_date: date as Date,
            })
          }
          selectEndDate={(date: Value) =>
            setEvent({
              ...event,
              end_date: date as Date,
            })
          }
        />
      )}

      <div className="grid grid-cols-2 gap-8">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variant={"outline"}
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={handleUpdateEvent}
          className="w-full bg-primary"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditEvent;
