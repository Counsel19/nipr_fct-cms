import EventForm from "@/components/events/EventForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createNewEvent } from "@/lib/redux/slices/events/eventsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { INewEvent } from "@/types/event";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface CreateEventProps {}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const CreateEvent: FC<CreateEventProps> = () => {
  const [newEvent, setNewEvent] = useState<INewEvent>({
    title: "",
    description: "",
    location: "",
    poster_image: null,
    start_date: new Date(),
    end_date: new Date(),
    type: null,
    fee: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((store: RootState) => store.event);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCreateEvent = async () => {
    try {
      const formData = new FormData();
      Object.entries(newEvent).forEach((item) => {
        const payloadValue =
          item[0] === "end_date" || item[0] === "start_date"
            ? format(item[1], "yyyy-MM-dd")
            : item[1];
        return formData.append(item[0], payloadValue);
      });

      const res = await dispatch(createNewEvent(formData));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Event has been Created ",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Creating Even",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Creating Event",
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
        <h4 className="leading-[3rem] text-[2.5rem]">Create Event </h4>
        <p className="text-base text-slate-500">
          Plese Supply All Details to Create Event
        </p>
      </div>
      <EventForm
        input={newEvent}
        handleOnchange={handleOnchange}
        setFile={(file: File) =>
          setNewEvent({
            ...newEvent,
            poster_image: file,
          })
        }
        handleSelectChange={handleSelectChange}
        selectStartDate={(date: Value) =>
          setNewEvent({
            ...newEvent,
            start_date: date as Date,
          })
        }
        selectEndDate={(date: Value) =>
          setNewEvent({
            ...newEvent,
            end_date: date as Date,
          })
        }
      />

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
          onClick={handleCreateEvent}
          className="w-full bg-primary"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateEvent;
