import GalleryForm from "@/components/gallery/GalleryForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { addToGallery } from "@/lib/redux/slices/gallery/galleryThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { GalleryItemType } from "@/lib/utils";
import { IGallery } from "@/types/gallery";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface AddToGalleryProps {}
const AddToGallery: FC<AddToGalleryProps> = () => {
  const [newGalleryItem, setNewGalleryItem] = useState<IGallery>({
    title: "",
    file: null,
    type: GalleryItemType.image,
    created_at: "",
    id: 1,
    path: "",
  });
  const navigate = useNavigate();
  const { isLoading } = useSelector((store: RootState) => store.gallery);

  const dispatch = useDispatch<AppDispatch>();

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewGalleryItem({ ...newGalleryItem, [name]: value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setNewGalleryItem({ ...newGalleryItem, [name]: value });
  };

  const handleAddToGallery = async () => {
    try {
      const formData = new FormData();
      Object.entries(newGalleryItem).forEach((item) =>
        formData.append(item[0], item[1])
      );
      const res = await dispatch(addToGallery(formData));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Item Added to Gallery Successfully ",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Adding Item",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Adding Item",
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
      <div className="space-y-12">
        <div className="space-y-6">
          <h4 className="leading-[3rem] text-[2.5rem]">Add Item to Gallery </h4>
          <p className="text-base text-slate-500">
            Plese Supply All Details to Add to Gallery
          </p>
        </div>

        <GalleryForm
          handleSelectChange={handleSelectChange}
          input={newGalleryItem}
          handleOnchange={handleOnchange}
          setFile={(file: File) =>
            setNewGalleryItem({
              ...newGalleryItem,
              file: file,
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
            onClick={handleAddToGallery}
            className="w-full bg-primary"
          >
            Add Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToGallery;
