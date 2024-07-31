import { toast } from "@/components/ui/use-toast";
import { Plus, Search, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { IGallery } from "@/types/gallery";

interface GalleryProps {}
const Gallery: FC<GalleryProps> = () => {
  //   const [open, setOpen] = useState(false);
  const [gallery, setGallery] = useState<IGallery[] | null>(null);
  const [loading, setLoading] = useState(false);
  //   const [openDeleteModal, setOpenDeleteModal] = useState(false);
  //   const [imageId, setImageId] = useState("");

  const getImages = async () => {
    try {
      setLoading(true);
      setGallery([
        {
          id: 1,
          title: "babalawo",
          path: "https://images.unsplash.com/photo-1721742149306-879cf7498eb7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          type: "image",
          created_at: "2024-07-29T12:42:00.000000Z",
          updated_at: "2024-07-29T12:42:00.000000Z",
        },
        {
          id: 2,
          title: "babalawo cap",
          path: "https://images.unsplash.com/photo-1721742149306-879cf7498eb7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          type: "image",
          created_at: "2024-07-29T12:42:36.000000Z",
          updated_at: "2024-07-29T12:42:36.000000Z",
        },
      ]);
    } catch (error) {
      toast({
        title: "Erro fetching Gallery",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="flex flex-col mx-[33px] ">
      <div className=" flex justify-end mt-5">
        <button
          type="button"
        //   onClick={() => setOpen(true)}
          className="flex items-center justify-center border-none rounded-xl gap-3 w-[164px] h-[40px] bg-[#6FCF97]"
        >
          <Plus className="text-[#fff]" />
          <p className="text-[#fff] font-poppins font-medium text-base">
            Add Image
          </p>
        </button>
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

        {loading ? (
          <Skeleton
            variant="rectangular"
            width={500}
            height={1000}
            style={{ backgroundColor: "rgba(0,0,0, 0.06)" }}
          />
        ) : (
          <div
            className={`${
              gallery && gallery?.length > 0
                ? "grid grid-cols-3 gap-[32px]"
                : "flex items-center justify-center"
            } mt-[29px]`}
          >
            {gallery && gallery?.length > 0 ? (
              gallery?.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#fff] shadow relative space-y-6"
                >
                  <img
                    src={item?.path}
                    alt="item-images"
                    className="rounded-tr-lg rounded-tl-lg"
                  />
                  <div className="rounded-br-lg rounded-bl-xl flex flex-col p-2">
                    <p className="font-poppins text-[#455A64] text-base font-light">
                      <span className="font-medium">Title:</span>{" "}
                      {item?.title || "Outdoor Area"}{" "}
                    </p>
                  </div>
                  <button
                    className="w-[26px] h-[26px] absolute top-1 right-1 bg-[#fff] flex  rounded-full justify-center items-center p-2"
                    onClick={() => {
                      //   setOpenDeleteModal(true);
                      //   setImageId(item.id.toString());
                    }}
                  >
                    <X className="text-[#5F5F5F] w-[14px] h-[14px]" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-2xl text-[#000] text-center font-semibold">
                No Images Available
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
