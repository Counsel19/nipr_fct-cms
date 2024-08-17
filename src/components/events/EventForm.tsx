import { FC } from "react";
import FileUpload from "../shared/FileUpload";
import LabledInput from "../shared/molecules/LabeledInput";
import { IEvent, INewEvent } from "@/types/event";
import DateTimePicker from "react-datetime-picker";
import { Value } from "@/pages/CreateEvent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EventType } from "@/lib/utils";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

interface EventFormProps {
  setFile?: (file: File) => void;
  input: INewEvent | IEvent;
  handleOnchange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange?: (value: string, name: string) => void;
  selectStartDate?: (value: Value) => void;
  selectEndDate?: (value: Value) => void;
}
const EventForm: FC<EventFormProps> = ({
  setFile,
  input,
  handleOnchange,
  handleSelectChange,
  selectStartDate,
  selectEndDate,
}) => {
  return (
    <div className="space-y-12">
      {setFile ? (
        <FileUpload setFile={setFile} />
      ) : (
        <img src={input.poster_image as string} alt={input.title} />
      )}

      <LabledInput
        label="Title"
        name="title"
        setInputValue={handleOnchange}
        value={input.title}
        placeholder="Event Title"
      />
      <LabledInput
        label="Description"
        name="description"
        value={input.description}
        setInputValue={handleOnchange}
        isTextArea
        placeholder="Event Description"
      />
      <LabledInput
        label="Location"
        name="location"
        value={input.location}
        setInputValue={handleOnchange}
        placeholder="Event Location"
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <DateTimePicker className="text-[1.4rem] h-[50px] rounded-lg" onChange={selectStartDate} value={input.start_date} />
        <DateTimePicker className="text-[1.4rem] h-[50px] rounded-lg" onChange={selectEndDate} value={input.end_date} />
      </div>
      {handleSelectChange ? (
        <div className="space-y-4 flex flex-col items-start">
          <label
            className="font-medium  text-base leading-[2.03rem]"
            htmlFor=""
          >
            Event Type
          </label>
          <Select onValueChange={(value) => handleSelectChange(value, "type")}>
            <SelectTrigger className="bg-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0 ">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(EventType).map((choice) => (
                <SelectItem
                  key={choice}
                  value={choice.toString()}
                  className="text-base p-3"
                >
                  {choice}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <LabledInput
          label="      Event Type"
          name="type"
          value={input.type ? input.type?.toString() : "N/A"}
          setInputValue={handleOnchange}
          placeholder="Event Location"
        />
      )}
    </div>
  );
};

export default EventForm;
