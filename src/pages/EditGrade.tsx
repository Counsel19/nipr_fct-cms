
import GradeForm from "@/components/grade/GradeForm";
import CustomLoader from "@/components/shared/atoms/CustomLoader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { fetchGradeById, updateGrade } from "@/lib/redux/slices/grade/gradeThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ICreateGrade } from "@/types/grade";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface EditEventProps {}
type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];
const EditEvent: FC<EditEventProps> = () => {
  const [event, setEvent] = useState<ICreateGrade>({
    name: "",
    amount: "",
    desc: "",
  });

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

  useEffect(() => {
    if (singleGrade) {
      setEvent({
      amount : singleGrade.amount,
      name : singleGrade.name,
      desc : singleGrade.desc,
      });
    }
  }, []);
  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setEvent({ ...event, [name]: value });
  };


  const handleUpdateEvent = async () => {
    try {
      

    

      const res = await dispatch(
        updateGrade({ payload: event, gradeId: gradeId as string })
      );

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Grade has been Updated ",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Updating Grade",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Updating Grade",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-12 p-8 grid items-start">
      <Button className="w-fit" onClick={() => navigate(-1)} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-3">
        <h4 className="leading-[3rem] text-[2.5rem]">Edit Grade </h4>
        <p className="text-base text-slate-500">Manage Grade Here</p>
      </div>
      {isLoading || !singleGrade ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <GradeForm
          input={event}
          handleOnchange={handleOnchange}
          
         
        />
      )}

      <div className="grid grid-cols-2 gap-8">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variant={"outline"}
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={handleUpdateEvent}
          className="w-full bg-primary"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditEvent;
