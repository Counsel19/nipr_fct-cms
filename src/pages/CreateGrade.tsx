import GradeForm from "@/components/grade/GradeForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createGrade } from "@/lib/redux/slices/grade/gradeThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ICreateGrade } from "@/types/grade";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface CreateGradeProps {}

const CreateGrade: FC<CreateGradeProps> = () => {
  const [newEvent, setNewEvent] = useState<ICreateGrade>({
    name: "",
    amount: "",
    desc: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((store: RootState) => store.grade);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCreateGrade = async () => {
    try {
      const res = await dispatch(createGrade(newEvent));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Grade has been Created ",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Creating Grade",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Creating Grade",
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
        <h4 className="leading-[3rem] text-[2.5rem]">Create Grade </h4>
        <p className="text-base text-slate-500">
          Plese Supply All Details to Create Event
        </p>
      </div>
      <GradeForm input={newEvent} handleOnchange={handleOnchange} />

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
          onClick={handleCreateGrade}
          className="w-full bg-primary"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateGrade;
