import { FC, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import CustomLoader from "../shared/atoms/CustomLoader";
import OptsDropdown from "../shared/molecules/OptionsDropdown";
import { Eye, Pen, Trash2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { openModal } from "@/lib/redux/slices/dialogSlice";
import { IResource } from "@/types/resource";
import { selectResource } from "@/lib/redux/slices/resource/resourceSlice";

interface ResourceTableBodyProps {}
const ResourceTableBody: FC<ResourceTableBodyProps> = () => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const [resourceData, setResourceData] = useState<IResource[] | null>(null);

  const { isLoading, allResources } = useSelector(
    (store: RootState) => store.resource
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (allResources) {
      setResourceData(allResources);
    }
  }, [allResources, dispatch]);

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
    {
      id: "3",
      icon: <Trash2 />,
      text: "Delete",
      btnOnclick: function (selectedId: number) {
        if (!allResources) return;
        dispatch(
          selectResource(allResources.find((item) => item.id === selectedId))
        );
        dispatch(
          openModal({
            icon: <TriangleAlert size={28} className="text-[#374957]" />,
            iconBg: "bg-[#FEF0C7]",
            iconBorderColor: "border-[#FFFAEB]",
            iconColor: "text-[#DC6803]",
            primaryColor: "bg-[#D83535]",
            title: "Delete Resource",
            description: "Are you sure you want to Delete this Resource?",
          })
        );
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
        resourceData &&
        resourceData.length > 0 &&
        resourceData.map((resource, index) => (
          <TableRow
            className="odd:bg-white even:bg-slate-100 text-base border-b-0"
            key={index}
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">
              <img
                src={
                  typeof resource.thumbnail === "string"
                    ? resource.thumbnail
                    : "/images/no-image-placeholder.png"
                }
                alt={resource.title}
                className="rounded-xl h-[3rem] object-contain"
              />
            </TableCell>

            <TableCell>{resource.title}</TableCell>
            <TableCell>{resource.desc.slice(0, 10)}...</TableCell>

            <TableCell className="">
              <div className="font-medium flex flex-col items-center">
                <span>{format(resource.created_at, "dd/LL/yyyy")}</span>
                <span className="text-[#999999]">
                  {format(resource.created_at, "hh:mm aaa")}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <a download href={resource.file}>
                View File
              </a>
            </TableCell>

            <TableCell className="relative">
              <div>
                <OptsDropdown
                  options={userTableOptns}
                  selectedId={selectedEventId}
                  onClick={() => {
                    setSelectedEventId(resource.id);
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      {!isLoading && resourceData && resourceData.length === 0 && (
        <TableRow>
          <TableCell rowSpan={0}>
            <h4 className="p-8 text-base font-semibold flex justify-center ">
              No Resource to display
            </h4>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default ResourceTableBody;
