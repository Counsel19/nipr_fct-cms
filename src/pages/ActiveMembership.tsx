import MembersTableBody from "@/components/membership/MembersTableBody";
import CustomTable from "@/components/shared/molecules/CustomTable";
import { fetchAllActiveMembers } from "@/lib/redux/slices/membershipManagement/membersManagementThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ActiveMembersipProps {}
const ActiveMembersip: FC<ActiveMembersipProps> = () => {
  //   const [skip, setSkip] = useState(0);
  //   const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  const { activeMembers } = useSelector(
    (store: RootState) => store.membershipManagement
  );

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchAllActiveMembers());
      } catch (error) {
        console.log();
      }
    };

    getData();
  }, [dispatch]);

  //   useEffect(() => {
  //     setSkip((currentPage - 1) * limit);
  //   }, [currentPage, limit]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaginationChange = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <CustomTable
        tableBody={<MembersTableBody memberList={activeMembers} />}
        headingList={membershipTableHeading}
        numberOfPages={activeMembers ? activeMembers.length : 0}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />
    </div>
  );
};

const membershipTableHeading = [
  {
    text: "Name",
  },
  {
    text: "Email",
  },
  {
    text: "Sent at",
  },
  {
    text: "Status",
  },

  {
    text: "",
  },
];

export default ActiveMembersip;
