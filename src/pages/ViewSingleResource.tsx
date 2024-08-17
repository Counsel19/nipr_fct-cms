import ResourceForm from "@/components/resources/ResourceForm";
import CustomLoader from "@/components/shared/atoms/CustomLoader";
import { Button } from "@/components/ui/button";
import { fetchSingleResource } from "@/lib/redux/slices/resource/resourceThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowLeft } from "lucide-react";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface ViewSingleResourceProps {}
const ViewSingleResource: FC<ViewSingleResourceProps> = () => {
  const { isLoading, selectedResourceItem } = useSelector(
    (store: RootState) => store.resource
  );

  const { resourceId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = () => {
      if (!resourceId) return;
      try {
        resourceId;
        dispatch(fetchSingleResource(resourceId));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="space-y-12 p-8 grid items-start">
      <Button className="w-fit" onClick={() => navigate(-1)} variant={"ghost"}>
        <ArrowLeft />
      </Button>
      <div className="space-y-3">
        <h4 className="leading-[3rem] text-[2.5rem]">View Resource </h4>
        <p className="text-base text-slate-500">Manage Resource Here</p>
      </div>
      {isLoading || !selectedResourceItem ? (
        <div>
          <CustomLoader />{" "}
        </div>
      ) : (
        <ResourceForm fromView input={selectedResourceItem} />
      )}
    </div>
  );
};

export default ViewSingleResource;
