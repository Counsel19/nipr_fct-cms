import { FC, useEffect, useState } from "react";

import { Eye, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import UserAvatar from "../shared/atoms/UserAvatar";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { IMembership } from "@/types/membership";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { openModal } from "@/lib/redux/slices/dialogSlice";
import CustomBadge from "../shared/atoms/CustomBadge";
import CustomLoader from "../shared/atoms/CustomLoader";
import { setSelectedMember } from "@/lib/redux/slices/membershipManagement/membersManagementSlice";
import OptsDropdown from "../shared/molecules/OptionsDropdown";

interface MembersTableBodyProps {
  memberList: IMembership[] | null;
}
const MembersTableBody: FC<MembersTableBodyProps> = ({ memberList }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [membersData, setMembersData] = useState<IMembership[] | null>(null);

  const { isLoading } = useSelector(
    (store: RootState) => store.membershipManagement
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (memberList) {
      setMembersData(memberList);
    }
  }, [memberList, dispatch]);

  // useEffect(() => {
  //   setSkip((currentPage - 1) * limit);
  // }, [currentPage, limit]);

  // useEffect(() => {
  //   if (isFiltering) {
  //     setMembersData(filterList);
  //   } else if (isSearching) {
  //     setMembersData(searchList);
  //   } else {
  //     setMembersData(allUsers);
  //   }
  // }, [isFiltering, allUsers, filterList, isSearching, searchList]);

  const userTableOptns = [
    {
      id: "2",
      icon: <Eye />,
      text: "View",
      btnOnclick: function (userId: number) {
        navigate(`/members/${userId}`);
      },
    },
    {
      id: "3",
      icon: <Eye />,
      text: "Approve",
      btnOnclick: function () {
        dispatch(
          openModal({
            icon: <Info size={28} className="text-[#374957]" />,
            iconBg: "bg-[#D1FADF]",
            iconBorderColor: "border-[#ECFDF3]",
            iconColor: "text-[#374957]",
            primaryColor: "bg-[#008753]",
            title: "Approve Application",
            description:
              "Are you sure you want to approve this membership Application?",
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
        membersData &&
        membersData.length > 0 &&
        membersData.map((member, index) => (
          <TableRow
            className="odd:bg-white even:bg-slate-100 text-base border-b-0"
            key={index}
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium p-6">
              <div className="flex gap-3 items-center">
                <UserAvatar
                  imgUrl="/assets/images/user_avatar.svg"
                  name="User"
                />
                <div>
                  <h5 className="font-medium ">
                    {member.first_name} {member.sur_name}
                  </h5>
                </div>
              </div>
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell className="font-medium flex flex-col items-center">
              <span>
                {member.created_at && format(member.created_at, "dd/LL/yyyy")}
              </span>
              <span className="text-[#999999]">
                {member.created_at && format(member.created_at, "hh:mm aaa")}
              </span>
            </TableCell>

            <TableCell>
              <CustomBadge status={member.status} />
            </TableCell>
            <TableCell className="relative">
              <div>
                <OptsDropdown
                  options={userTableOptns}
                  selectedId={selectedUserId}
                  status={member.status}
                  onClick={() => {
                    console.log(member, "member");
                    setSelectedUserId(member.id);
                    dispatch(setSelectedMember(membersData[index]));
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      {!isLoading && membersData && membersData.length === 0 && (
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

export default MembersTableBody;
