import { Table } from "@/components/ui/table";
import { IHeadingList } from "@/types/custom";
import { ChangeEvent, FC, ReactNode } from "react";
import CustomTableHeader from "./CustomTableHeader";
import PaginationControlled from "./PaginationControlled";

interface CustomTableProps {
  headingList: IHeadingList[];
  tableBody: ReactNode;
  numberOfPages: number;
  currentPage: number;
  handlePaginationChange: (_: ChangeEvent<unknown>, value: number) => void;
}

const CustomTable: FC<CustomTableProps> = ({
  headingList,
  tableBody,
  numberOfPages,
  currentPage,
  handlePaginationChange,
}) => {
  return (
    <div>
      <Table className="border-y mb-6 text-base">
        <CustomTableHeader headingList={headingList} />
        {tableBody}
      </Table>
      <PaginationControlled
        page={currentPage}
        totalNumberOfPages={numberOfPages}
        handlePaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default CustomTable;
