import NewsTableBody from "@/components/newsPost/NewsTableBody";
import ConfirmationDialog from "@/components/shared/molecules/ConfirmationDialog";
import CustomTable from "@/components/shared/molecules/CustomTable";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteNewsPost, fetchAllNewsPost } from "@/lib/redux/slices/news/newsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface ViewNewsProps {}
const ViewNews: FC<ViewNewsProps> = () => {
  const { allNewsPost, singleNewsPost } = useSelector((store: RootState) => store.newsPost);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen } = useSelector((store: RootState) => store.dialog);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchAllNewsPost());
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaginationChange = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  
  const confirmModal = async () => {
    if (!singleNewsPost) return;
    try {
      const res = await dispatch(deleteNewsPost(singleNewsPost.id));

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });

      await dispatch(fetchAllNewsPost());
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Deleting News Post",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Deleting News Post",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8 space-y-20">
      <div className="flex justify-between items-center">
        <div />

        <Link to={"/news/new"} className={cn(buttonVariants({}))}>
          <Plus />
          Create News Post
        </Link>
      </div>
      <CustomTable
        tableBody={<NewsTableBody />}
        headingList={newsPostTableHeading}
        numberOfPages={allNewsPost ? allNewsPost.length : 0}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />
       {isOpen && <ConfirmationDialog confirmModal={confirmModal} />}
    </div>
  );
};

const newsPostTableHeading = [
  {
    text: "User",
  },
  {
    text: "Image",
  },
  {
    text: "Title",
  },
  {
    text: "Body ",
  },

  {
    text: "Posted At",
  },
  {
    text: "",
  },
];

export default ViewNews;
