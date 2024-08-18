import GradeTableBody from "@/components/grade/GradeTableBody";
import ConfirmationDialog from "@/components/shared/molecules/ConfirmationDialog";
import CustomTable from "@/components/shared/molecules/CustomTable";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  deleteGrade,
  fetchAllGrades,
} from "@/lib/redux/slices/grade/gradeThunk";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface AllGradesProps {}
const AllGrades: FC<AllGradesProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen } = useSelector((store: RootState) => store.dialog);

  const { allGrades, singleGrade } = useSelector(
    (store: RootState) => store.grade
  );

  useEffect(() => {
    const getData = () => {
      try {
        dispatch(fetchAllGrades());
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaginationChange = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const confirmModal = async () => {
    if (!singleGrade) return;
    try {
      const res = await dispatch(deleteGrade(singleGrade.id.toString()));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });

      await dispatch(fetchAllGrades());
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Deleting Grade",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Deleting Grade",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8 space-y-20">
      <div className="flex justify-between items-center">
        <div />

        <Link to={"/grade/new"} className={cn(buttonVariants({}))}>
          <Plus />
          Create Grade
        </Link>
      </div>
      <CustomTable
        tableBody={<GradeTableBody />}
        headingList={gradeTableHeading}
        numberOfPages={allGrades ? allGrades.length : 0}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />

      {isOpen && <ConfirmationDialog confirmModal={confirmModal} />}
    </div>
  );
};

const gradeTableHeading = [
  {
    text: "Name",
  },
  {
    text: "Amount",
  },
  {
    text: "Description",
  },
  {
    text: "Created At",
  },

  {
    text: "",
  },
];

export default AllGrades;
