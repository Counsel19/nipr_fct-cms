import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import  { FC, MouseEventHandler, ReactNode } from "react";



interface CustomTableHeaderProps {
  headingList: {
    text: string;
    icon?: ReactNode;
    onIconClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  }[];
}
const CustomTableHeader: FC<CustomTableHeaderProps> = ({ headingList }) => {
  return (
    <TableHeader className="h-[5.5rem] ">
      <TableRow className="h-full border-b-0"> 
        <TableHead className="min-w-[5rem]">S/N</TableHead>
        {headingList.map((heading, index) => (
          <TableHead  key={index} className="">
            <span>{heading.text}</span>
            {heading?.icon && (
              <Button
                variant={"ghost"}
                onClick={heading.onIconClick}
                className="p-0 m-0 w-fit"
              >
                {heading.icon}
              </Button>
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default CustomTableHeader;
