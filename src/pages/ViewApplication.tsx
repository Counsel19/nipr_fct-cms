import BasicDetailsForm from "@/components/membership/BasicDetailsForm";
import CareerDetails from "@/components/membership/CareerDetails";
import CustomLoader from "@/components/shared/atoms/CustomLoader";
import { Button } from "@/components/ui/button";
import {
  approveMembership,
  fetchMemberById,
} from "@/lib/redux/slices/membershipManagement/membersManagementThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowLeft } from "lucide-react";

import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface ViewApplicationProps {}
const ViewApplication: FC<ViewApplicationProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedMember } = useSelector(
    (store: RootState) => store.membershipManagement
  );

  const { userId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = async () => {
      if (!userId) return;
      try {
        setIsLoading(true);
        await dispatch(fetchMemberById(parseInt(userId)));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="space-y-12 p-12 grid items-start">
      <Button className="w-fit" onClick={() => navigate(-1)} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-3">
        <h4 className="leading-[3rem] text-[2.5rem]">View Member Details </h4>
        <p className="text-base text-slate-500">Full Details Here</p>
      </div>
      {selectedMember && !isLoading ? (
        <div className=" ">
          <BasicDetailsForm space-y-8 inputValue={selectedMember} />
          <CareerDetails inputValue={selectedMember} />

          <div className="grid grid-cols-2 gap-8 mt-8">
            <Button
              onClick={() => {
                navigate(-1);
              }}
              variant={"outline"}
              className="w-full"
            >
              Cancel/Prev
            </Button>
            <Button
              disabled={true}
              isLoading={isLoading}
              onClick={async () => {
                await dispatch(approveMembership(selectedMember.id));
              }}
              className="w-full bg-primary"
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <CustomLoader />
        </div>
      )}
    </div>
  );
};

export default ViewApplication;
