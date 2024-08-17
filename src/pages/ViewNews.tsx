import NewsTableBody from "@/components/newsPost/NewsTableBody";
import CustomTable from "@/components/shared/molecules/CustomTable";
import { buttonVariants } from "@/components/ui/button";
import { fetchAllNewsPost } from "@/lib/redux/slices/news/newsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface ViewNewsProps {}
const ViewNews: FC<ViewNewsProps> = () => {
  const { allNewsPost } = useSelector((store: RootState) => store.newsPost);
  const [currentPage, setCurrentPage] = useState(1);

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
