import MembersTableBody from "@/components/membership/MembersTableBody";
import CustomTable from "@/components/shared/molecules/CustomTable";
import { fetchAllPendingMembers } from "@/lib/redux/slices/membershipManagement/membersManagementThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PendingMembershipProps {}
const PendingMembership: FC<PendingMembershipProps> = () => {
  //   const [skip, setSkip] = useState(0);
  //   const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  const { pendingMembers } = useSelector(
    (store: RootState) => store.membershipManagement
  );

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchAllPendingMembers());
      } catch (error) {
        console.log();
      }
    };

    getData();
  }, [dispatch]);

  useEffect(() => {}, []);

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
        tableBody={<MembersTableBody memberList={pendingMembers} />}
        headingList={membershipTableHeading}
        numberOfPages={pendingMembers ? pendingMembers.length : 0}
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

export default PendingMembership;
