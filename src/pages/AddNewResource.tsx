import ResourceForm from "@/components/resources/ResourceForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { addResource } from "@/lib/redux/slices/resource/resourceThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { IAddNewResource } from "@/types/resource";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface AddNewResourceProps {}

const init = {
  title: "",
  desc: "",
  file: null,
  thumbnail: null,
};

const AddNewResource: FC<AddNewResourceProps> = () => {
  const [newResource, setNewResource] = useState<IAddNewResource>(init);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((store: RootState) => store.resource);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewResource({ ...newResource, [name]: value });
  };

  const handleAddNewResource = async () => {
    try {
      const formData = new FormData();
      Object.entries(newResource).forEach((item) => {
        return formData.append(item[0], item[1]);
      });

      const res = await dispatch(addResource(formData));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Resource has been Created ",
      });
      setNewResource(init);
      navigate(-1)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Creating Resource",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Creating Resource",
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
        <h4 className="leading-[3rem] text-[2.5rem]">Create Resource </h4>
        <p className="text-base text-slate-500">
          Plese Supply All Details to Create Resource
        </p>
      </div>
      <ResourceForm
        input={newResource}
        handleOnchange={handleOnchange}
        setFile={(file: File) =>
          setNewResource({
            ...newResource,
            file: file,
          })
        }
        setThumbnail={(file: File) =>
          setNewResource({
            ...newResource,
            thumbnail: file,
          })
        }
      />

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
          onClick={handleAddNewResource}
          className="w-full bg-primary"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default AddNewResource;
