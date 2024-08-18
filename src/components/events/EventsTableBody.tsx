import { FC, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import CustomLoader from "../shared/atoms/CustomLoader";
import { IEvent } from "@/types/event";
import OptsDropdown from "../shared/molecules/OptionsDropdown";
import { Eye, Pen, Trash2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { openModal } from "@/lib/redux/slices/dialogSlice";
import { selectEvent } from "@/lib/redux/slices/events/eventsSlice";

interface EventsTableBodyProps {}
const EventsTableBody: FC<EventsTableBodyProps> = () => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const [eventsData, setEventsData] = useState<IEvent[] | null>(null);

  const { isLoading, allEvents } = useSelector(
    (store: RootState) => store.event
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (allEvents) {
      setEventsData(allEvents);
    }
  }, [allEvents, dispatch]);

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
        if (!allEvents) return;
        dispatch(selectEvent(allEvents.find((item) => item.id === selectedId)));
        dispatch(
          openModal({
            icon: <TriangleAlert size={28} className="text-[#374957]" />,
            iconBg: "bg-[#FEF0C7]",
            iconBorderColor: "border-[#FFFAEB]",
            iconColor: "text-[#DC6803]",
            primaryColor: "bg-[#D83535]",
            title: "Delete Event",
            description: "Are you sure you want to Delete this Event?",
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
        eventsData &&
        eventsData.length > 0 &&
        eventsData.map((event, index) => (
          <TableRow
            className="odd:bg-white even:bg-slate-100 text-base border-b-0"
            key={index}
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium p-6">
              <img
                src={
                  typeof event.poster_image === "string"
                    ? event.poster_image
                    : "/images/no-image-placeholder.png"
                }
                alt={event.title}
                className="rounded-xl h-[3rem] object-contain"
              />
            </TableCell>
            <TableCell>{event.title}</TableCell>
            <TableCell>{event.location}</TableCell>

            <TableCell className="">
              <div className="font-medium flex flex-col items-center">
                <span>{format(event.start_date, "dd/LL/yyyy")}</span>
                <span className="text-[#999999]">
                  {format(event.start_date, "hh:mm aaa")}
                </span>
              </div>
            </TableCell>
            <TableCell className="font-medium flex flex-col items-center">
              <span>{format(event.end_date, "dd/LL/yyyy")}</span>
              <span className="text-[#999999]">
                {format(event.end_date, "hh:mm aaa")}
              </span>
            </TableCell>

            <TableCell>{event.type}</TableCell>
            <TableCell className="relative">
              <div>
                <OptsDropdown
                  options={userTableOptns}
                  selectedId={selectedEventId}
                  onClick={() => {
                    console.log(event, "event");
                    setSelectedEventId(event.id);
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      {!isLoading && eventsData && eventsData.length === 0 && (
        <TableRow>
          <TableCell rowSpan={0}>
            <h4 className="p-8 text-base font-semibold flex justify-center ">
              No User to display
            </h4>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default EventsTableBody;
