import { TriangleAlert, X } from "lucide-react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { IGallery } from "@/types/gallery";
import { openModal } from "@/lib/redux/slices/dialogSlice";
import { selectGalleryItem } from "@/lib/redux/slices/gallery/gallerySlice";
import { Button } from "../ui/button";

interface GalleryCardProps {
  data: IGallery;
}
const GalleryCard: FC<GalleryCardProps> = ({ data }) => {
  const { path, title } = data;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-[#fff] shadow relative space-y-6 p-4">
      <img
        src={path || "/images/no-image-placeholder.png"}
        alt="item-images"
        className="rounded-tr-lg rounded-tl-lg object-cover object-center"
      />
      <div className="rounded-br-lg rounded-bl-xl flex flex-col p-2">
        <p className="font-poppins text-[#455A64] text-base font-light">
          <span className="font-medium">Title:</span> {title || "Outdoor Area"}{" "}
        </p>
      </div>
      <Button
        className="w-[26px] h-[26px] absolute top-1 bg-rose-300 hover:bg-rose-200 right-4  flex  rounded-full justify-center items-center p-2"
        onClick={() => {
          dispatch(selectGalleryItem(data));
          dispatch(
            openModal({
              icon: <TriangleAlert className="text-[#DC6803]" />,
              iconBg: "bg-[#FEF0C7]",
              iconBorderColor: "border-[#FFFAEB]",
              iconColor: "text-[#DC6803]",
              primaryColor: "bg-[#D83535]",
              title: "Delete Gallery Item",
              description:
                "When you click on confirm, gallery item will be automatically deleted",
            })
          );
        }}
      >
        <X className="text-primary  w-[14px] h-[14px]" />
      </Button>
    </div>
  );
};

export default GalleryCard;
