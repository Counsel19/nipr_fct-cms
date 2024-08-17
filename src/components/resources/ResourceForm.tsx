import { FC } from "react";
import FileUpload from "../shared/FileUpload";
import LabledInput from "../shared/molecules/LabeledInput";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { IAddNewResource, IResource } from "@/types/resource";
import { Button } from "../ui/button";

interface ResourceFormProps {
  fromView?: boolean;
  setThumbnail?: (file: File) => void;
  setFile?: (file: File) => void;
  input: IAddNewResource | IResource;
  handleOnchange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ResourceForm: FC<ResourceFormProps> = ({
  setThumbnail,
  fromView,
  setFile,
  input,
  handleOnchange,
}) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4 text-left">
        <label className="font-medium text-base  leading-[2.03rem]">
          Resource Thumbnail
        </label>
        {setThumbnail ? (
          <FileUpload setFile={setThumbnail} />
        ) : (
          <div className="h-[200px] p-4 rounded-lg border overflow-hidden">
            <img src={input.thumbnail as string} alt={input.title} />
          </div>
        )}
      </div>
      <LabledInput
        label="Title"
        name="title"
        setInputValue={handleOnchange}
        value={input.title}
        placeholder="Resource Title"
      />
      <LabledInput
        label="Description"
        name="desc"
        value={input.desc}
        setInputValue={handleOnchange}
        isTextArea
        placeholder="Resource Description"
      />
      <div className="space-y-4 text-left">
        <label className="font-medium text-base  leading-[2.03rem]">
          Resource File
        </label>
        {setFile ? (
          <FileUpload
            accept=".pdf,.doc,.docx,.xls,.xlsx svg, .png, .jpg, .jpeg, .gif"
            setFile={setFile}
          />
        ) : (
          <div className="flex gap-6">
            <Button>
              <a download href={input.file as string}>
                View File
              </a>
            </Button>
            {!fromView && <Button variant={"outline"}>Change File</Button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceForm;
