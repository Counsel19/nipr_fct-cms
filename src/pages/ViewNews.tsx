import DeleteNews from "@/components/news/DeleteNews";
import NewsDialog from "@/components/news/NewsDialog";
import PaginationControlled from "@/components/shared/molecules/PaginationControlled";
import { Button } from "@/components/ui/button";
import { INews } from "@/types/news";
import { Menu } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ViewNewsProps {}
const ViewNews: FC<ViewNewsProps> = () => {
  const [news, setNews] = useState<INews[] | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  // const [openUpdateBlogPost, setOpenUpdateBlogPost] = useState(false);
  // const [updateBlogPost, setUpdateBlogPost] = useState();
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [data, setData] = useState();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // const navigate = useNavigate();

  const fetchBlogPosts = async () => {
    try {
      console.log("Fetcjing");
      setNews([
        {
          id: 1,
          user_id: 1,
          title: "A wonderful comic",
          image:
            "https://images.unsplash.com/photo-1721742149306-879cf7498eb7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          body: "monthly mag kdfdisngniodgfinnfiongionfiongionm cvnjn",
          created_at: "2024-07-29T12:46:14.000000Z",
          updated_at: "2024-07-29T12:46:14.000000Z",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaginationChange = (_: ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  useEffect(() => {
    fetchBlogPosts();
    setTotalNumberOfPages(8)
  }, [pageNumber]);

  return (
    <div className="md:p-8 flex flex-col gap-4">
      <p className="text-black text-xl font-semibold">News</p>
      <div
        className={`${
          news && news?.length > 0
            ? "grid grid-cols-3 gap-8"
            : "flex items-center justify-center"
        }`}
      >
        {news && news?.length > 0 ? (
          news?.map((newsItem, index) => (
            <div
              key={index}
              className="rounded-tl-xl bg-white p-3 rounded-tr-xl xs:w-full md:max-w-[280px]"
            >
              <img
                loading="lazy"
                src={newsItem?.image}
                alt=""
                className="rounded-tl-xl rounded-tr-xl xs:w-full  h-[290px] object-cover"
              />
              <div className="flex flex-col">
                <p className="font-bold text-lg">{newsItem?.title}</p>
                <div className="flex items-end justify-end">
                  <Menu
                  // action={(action) => handleMenuClick(action, newsItem)}
                  >
                    <div className="flex flex-col gap-3 p-3">
                      <NewsDialog
                        isOpen={isDeleteOpen}
                        setIsOpen={setIsDeleteOpen}
                        actionBtn={
                          <Button className="bg-accentGreen h-full gap-3">
                            Delete
                          </Button>
                        }
                        dialogElement={
                          <DeleteNews
                            handleClose={() => setIsDeleteOpen(false)}
                          />
                        }
                      />
                      <Link
                        to="/update-news"
                        state={newsItem}
                        className="cursor-pointer hover:bg-[#F8F8F8] p-1"
                        // onClick={() => {navigate("/update-newsItem"), setUpdateBlogPost(newsItem)}}
                      >
                        Edit
                      </Link>
                    </div>
                  </Menu>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-[#000] text-center font-semibold">
            No News Available
          </p>
        )}
      </div>
      <div className="flex justify-end mt-8">
        <PaginationControlled
          page={pageNumber}
          totalNumberOfPages={totalNumberOfPages}
          handlePaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ViewNews;
