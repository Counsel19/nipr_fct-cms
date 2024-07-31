import { cn } from "@/lib/utils";
import { FC } from "react";
import { Button, buttonVariants } from "../ui/button";
import { DownloadCloud, Trash } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  path: string;
}
const ResourceCard: FC<ResourceCardProps> = ({ title, description, path }) => {
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 space-y-6 ">
      <div className="flex flex-col items-start gap-3">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="font-normal text-base text-gray-700">{description}</p>
      </div>

      <div className="flex w-full  justify-between items-center">
        <a
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "bg-green-50",
            })
          )}
          download
          href={path}
        >
          <DownloadCloud size={18} />
        </a>

        <Button variant={"ghost"} className=" bg-rose-50 text-rose-500">
          <Trash size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;
