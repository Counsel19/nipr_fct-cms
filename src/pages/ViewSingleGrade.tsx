import GradeForm from "@/components/grade/GradeForm";
import CustomLoader from "@/components/shared/atoms/CustomLoader";
import { Button } from "@/components/ui/button";
import { fetchGradeById } from "@/lib/redux/slices/grade/gradeThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowLeft } from "lucide-react";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface ViewSingleGradeProps {}
const ViewSingleGrade: FC<ViewSingleGradeProps> = () => {
  const { isLoading, singleGrade } = useSelector(
    (store: RootState) => store.grade
  );

  const { gradeId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = () => {
      if (!gradeId) return;
      try {
        gradeId;
        dispatch(fetchGradeById(gradeId));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="space-y-12 p-8 grid items-start">
      <Button className="w-fit" onClick={() => navigate(-1)} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-3">
        <h4 className="leading-[3rem] text-[2.5rem]">View Grade </h4>
        <p className="text-base text-slate-500">Manage Grade Here</p>
      </div>
      {isLoading || !singleGrade ? (
        <div>
          <CustomLoader />{" "}
        </div>
      ) : (
        <GradeForm input={singleGrade} />
      )}
    </div>
  );
};

export default ViewSingleGrade;
