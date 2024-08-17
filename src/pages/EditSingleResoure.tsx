import ResourceForm from "@/components/resources/ResourceForm";
import CustomLoader from "@/components/shared/atoms/CustomLoader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  fetchSingleResource,
  updateResource,
  updateResourceFile,
  updateResoureThumbnail,
} from "@/lib/redux/slices/resource/resourceThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { IAddNewResource } from "@/types/resource";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface EditSingleResourceProps {}
type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];
const EditSingleResource: FC<EditSingleResourceProps> = () => {
  const [resource, setResource] = useState<IAddNewResource>({
    title: "",
    desc: "",
    file: null,
    thumbnail: null,
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const { isLoading, selectedResourceItem } = useSelector(
    (store: RootState) => store.resource
  );

  const { resourceId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = () => {
      if (!resourceId) return;
      try {
        resourceId;
        dispatch(fetchSingleResource(resourceId));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (selectedResourceItem) {
      setResource({
        desc: selectedResourceItem.desc,
        title: selectedResourceItem.title,
        file: selectedResourceItem.file,
        thumbnail: selectedResourceItem.thumbnail,
      });
    }
  }, []);
  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setResource({ ...resource, [name]: value });
  };

  const handleUpdateResource = async () => {
    try {
      if (!resourceId) return;

      setUpdateLoading(true);

      if (resource.file && typeof resource.file == "object") {
        const formData = new FormData();
        formData.append("file", resource.file);
        formData.append("resource_id", resourceId);
        await dispatch(updateResourceFile(formData));
      }
      if (resource.thumbnail && typeof resource.thumbnail == "object") {
        const formData = new FormData();
        formData.append("file", resource.thumbnail);
        formData.append("resource_id", resourceId);
        await dispatch(updateResoureThumbnail(formData));
      }

      const res = await dispatch(
        updateResource({
          resource_id: resourceId,
          desc: resource.desc,
          title: resource.title,
        })
      );

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Resource has been Updated ",
      });
      navigate(-1)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Updating Even",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Updating Event",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="space-y-12 p-8 grid items-start">
      <Button className="w-fit" onClick={() => navigate(-1)} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-3">
        <h4 className="leading-[3rem] text-[2.5rem]">Edit Resource </h4>
        <p className="text-base text-slate-500">Manage Resource Here</p>
      </div>
      {isLoading || !selectedResourceItem ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <ResourceForm
          input={resource}
          handleOnchange={handleOnchange}
          setFile={(file: File) =>
            setResource({
              ...resource,
              file: file,
            })
          }
          setThumbnail={(file: File) =>
            setResource({
              ...resource,
              thumbnail: file,
            })
          }
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
          isLoading={updateLoading}
          onClick={handleUpdateResource}
          className="w-full bg-primary"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditSingleResource;
