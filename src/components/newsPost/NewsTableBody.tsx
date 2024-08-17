import { FC, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import CustomLoader from "../shared/atoms/CustomLoader";
import OptsDropdown from "../shared/molecules/OptionsDropdown";
import { Eye, Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { INews } from "@/types/news";

interface NewsTableBodyProps {}
const NewsTableBody: FC<NewsTableBodyProps> = () => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const [newsData, setNewsData] = useState<INews[] | null>(null);

  const { isLoading, allNewsPost } = useSelector(
    (store: RootState) => store.newsPost
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (allNewsPost) {
      setNewsData(allNewsPost);
    }
  }, [allNewsPost, dispatch]);

  const userTableOptns = [
    {
      id: "2",
      icon: <Eye />,
      text: "View",
      btnOnclick: function (userId: number) {
        navigate(`${userId}`);
      },
    },
    {
      id: "2",
      icon: <Pen />,
      text: "Edit",
      btnOnclick: function (userId: number) {
        navigate(`${userId}/edit`);
      },
    },
  ];

  return (
    <TableBody>
      {isLoading && (
        <TableRow>
          <TableCell rowSpan={0}>
            <CustomLoader height={30} width={30} />
          </TableCell>
        </TableRow>
      )}
      {!isLoading &&
        newsData &&
        newsData.length > 0 &&
        newsData.map((post, index) => (
          <TableRow
            className="odd:bg-white even:bg-slate-100 text-base border-b-0"
            key={index}
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{post.user_id}</TableCell>
            <TableCell className="font-medium p-6">
              <img
                src={
                  typeof post.image === "string"
                    ? "/images/no-image-placeholder.png"
                    : "/images/no-image-placeholder.png"
                }
                alt={post.title}
                className="rounded-xl h-[3rem] object-contain"
              />
            </TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.body.slice(0, 10)}...</TableCell>

            <TableCell className="">
              <div className="font-medium flex flex-col items-center">
                <span>{format(post.created_at, "dd/LL/yyyy")}</span>
                <span className="text-[#999999]">
                  {format(post.created_at, "hh:mm aaa")}
                </span>
              </div>
            </TableCell>

            <TableCell className="relative">
              <div>
                <OptsDropdown
                  options={userTableOptns}
                  selectedId={selectedEventId}
                  onClick={() => {
                    console.log(post, "post");
                    setSelectedEventId(post.id);
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      {!isLoading && newsData && newsData.length === 0 && (
        <TableRow>
          <TableCell rowSpan={0}>
            <h4 className="p-8 text-base font-semibold flex justify-center ">
              No News to display
            </h4>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default NewsTableBody;
