import { cn } from "@/lib/utils";
import { FC } from "react";
import { TailSpin } from "react-loader-spinner";

interface CustomLoaderProps {
  height?: number;
  width?: number;
  padding?: string;
}
const CustomLoader: FC<CustomLoaderProps> = ({ height, width, padding }) => {
  return (
    <div
      className={cn(
        "flex w-full h-full justify-center items-center",
        padding ? padding : " p-16"
      )}
    >
      <TailSpin width={width} height={height} />
    </div>
  );
};

export default CustomLoader;
