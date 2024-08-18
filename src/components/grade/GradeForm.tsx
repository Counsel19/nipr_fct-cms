import { FC } from "react";
import LabledInput from "../shared/molecules/LabeledInput";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { ICreateGrade, IGrade } from "@/types/grade";

interface GradeFormProps {
  input: IGrade | ICreateGrade;
  handleOnchange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const GradeForm: FC<GradeFormProps> = ({ input, handleOnchange }) => {
  return (
    <div className="space-y-12">
      <LabledInput
        label="Grade Name"
        name="name"
        setInputValue={handleOnchange}
        value={input.name}
        placeholder="Grade Name"
      />
      <LabledInput
        label="Amount"
        name="amount"
        value={input.amount.toString()}
        setInputValue={handleOnchange}
        placeholder="Grade Amount"
      />
      <LabledInput
        label="Description"
        name="desc"
        value={input.desc}
        setInputValue={handleOnchange}
        isTextArea
        placeholder="Grade Description"
      />
    </div>
  );
};

export default GradeForm;
