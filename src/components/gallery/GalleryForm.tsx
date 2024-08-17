import { FC } from "react";
import FileUpload from "../shared/FileUpload";
import { IGallery } from "@/types/gallery";
import LabledInput from "../shared/molecules/LabeledInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GalleryItemType } from "@/lib/utils";

interface GalleryFormProps {
  setFile?: (file: File) => void;
  input: IGallery;
  handleOnchange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange?: (value: string, name: string) => void;
}
const GalleryForm: FC<GalleryFormProps> = ({
  setFile,
  input,
  handleOnchange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4 flex flex-col items-start">
        <label className="font-medium  text-base leading-[2.03rem]" htmlFor="">
          Item Type
        </label>
        {handleSelectChange && (
          <Select onValueChange={(value) => handleSelectChange(value, "type")}>
            <SelectTrigger className="bg-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0 ">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(GalleryItemType).map((choice) => (
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
        )}
      </div>
      {setFile  ? (
        <FileUpload setFile={setFile} />
      ) : (
        <img src={input.path} alt={input.title} />
      )}

      <LabledInput
        label="Title"
        name="title"
        setInputValue={handleOnchange}
        value={input.title}
        placeholder="Item Title"
      />
    </div>
  );
};

export default GalleryForm;
