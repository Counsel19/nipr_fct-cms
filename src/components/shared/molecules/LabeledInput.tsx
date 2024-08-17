import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";

interface LabledInputProps {
  label: string;
  placeholder?: string;
  isTextArea?: boolean;
  type?: string
  name: string;
  value: string;
  className?: string;
  setInputValue?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const LabledInput: FC<LabledInputProps> = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  isTextArea,
  className,
  setInputValue,
}) => {
  return (
    <div className="space-y-4 text-left">
      <label
        className="font-medium text-base  leading-[2.03rem]"
        htmlFor={label}
      >
        {label}
      </label>
      {isTextArea ? (
        <Textarea
          name={name}
          value={value}
          onChange={setInputValue}
          className={className}
          placeholder={placeholder || `Enter your ${label}`}
        />
      ) : (
        <Input
          name={name}
          value={value}
          type={type}
          onChange={setInputValue}
          className={className}
          placeholder={placeholder || `Enter your ${label}`}
        />
      )}
    </div>
  );
};

export default LabledInput;
