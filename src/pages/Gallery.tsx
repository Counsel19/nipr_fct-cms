import { Plus, Search } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { IGallery } from "@/types/gallery";
import GalleryCard from "@/components/gallery/GalleryCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  deleteItemFromGallery,
  fetchGallery,
} from "@/lib/redux/slices/gallery/galleryThunk";
import ConfirmationDialog from "@/components/shared/molecules/ConfirmationDialog";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface GalleryProps {}
const Gallery: FC<GalleryProps> = () => {
  //   const [open, setOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<IGallery[] | null>(null);

  //   const [openDeleteModal, setOpenDeleteModal] = useState(false);
  //   const [imageId, setImageId] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { gallery, selectedGalleryItem, isLoading } = useSelector(
    (store: RootState) => store.gallery
  );
  const { isOpen } = useSelector((store: RootState) => store.dialog);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(fetchGallery());
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (gallery) {
      setGalleryData(gallery);
    }
  }, [gallery]);

  const handleDeleteGalleryItem = async () => {
    if (!selectedGalleryItem) return;
    try {
      const res = await dispatch(
        deleteItemFromGallery(selectedGalleryItem.id.toString())
      );

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      await dispatch(fetchGallery());
      toast({
        title: "Gallery Item Deleted",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Signing Up",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Login in",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col mx-[33px] ">
      <div className=" flex justify-end mt-5">
        <Link className={cn(buttonVariants())} to="/gallery/new">
          <Plus /> Add Image
        </Link>
      </div>
      <div className="bg-[#fff] flex flex-col pt-[23px] pl-[33px] pr-[33px] pb-[76px] mt-[28px] rounded">
        <div className="flex gap-3 items-center mb-[11px]">
          <div className="w-full bg-[#F8F8FA] flex items-center gap-[10px] p-2  rounded-lg">
            <Search className="w-[24px] h-[24px] text-[#9A9AA6]" />
            <input
              name="search"
              placeholder="Search"
              className="outline-none w-full font-hanken p-3 bg-transparent text-[#8B8B8B] text-[11px]"
            />
          </div>
          <button className="text-[#fff] font-inter text-base w-[102px] h-[40px] bg-[#263238] rounded-lg">
            Search
          </button>
        </div>
        <hr />

        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width={500}
            height={1000}
            style={{ backgroundColor: "rgba(0,0,0, 0.06)" }}
          />
        ) : (
          <div
            className={`${
              galleryData && galleryData?.length > 0
                ? "grid grid-cols-3 gap-[32px]"
                : "flex items-center justify-center"
            } mt-[29px]`}
          >
            {galleryData && galleryData?.length > 0 ? (
              gallery?.map((item, index) => (
                <React.Fragment key={index}>
                  <GalleryCard data={item} />
                </React.Fragment>
              ))
            ) : (
              <p className="text-2xl text-[#000] text-center font-semibold">
                No Images Available
              </p>
            )}
          </div>
        )}
      </div>

      {isOpen && <ConfirmationDialog confirmModal={handleDeleteGalleryItem} />}
    </div>
  );
};

export default Gallery;
