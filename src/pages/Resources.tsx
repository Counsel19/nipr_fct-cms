import ResourceTableBody from "@/components/resources/ResourceTableBody";
import ConfirmationDialog from "@/components/shared/molecules/ConfirmationDialog";
import CustomTable from "@/components/shared/molecules/CustomTable";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  deleteResources,
  fetchResource,
} from "@/lib/redux/slices/resource/resourceThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface AllResourcesProps {}
const AllResources: FC<AllResourcesProps> = () => {
  const { allResources, selectedResourceItem } = useSelector(
    (store: RootState) => store.resource
  );
  const { isOpen } = useSelector((store: RootState) => store.dialog);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchResource());
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

  const confirmModal = async () => {
    if (!selectedResourceItem) return;
    try {
      const res = await dispatch(
        deleteResources(selectedResourceItem.id.toString())
      );

      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });

      await dispatch(fetchResource());
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Deleting Resources",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Deleting Resources",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8 space-y-20">
      <div className="flex justify-between items-center">
        <div />

        <Link to={"/resources/new"} className={cn(buttonVariants({}))}>
          <Plus />
          Add Resource
        </Link>
      </div>
      <CustomTable
        tableBody={<ResourceTableBody />}
        headingList={resourceTableHeadings}
        numberOfPages={allResources ? allResources.length : 0}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />

      {isOpen && <ConfirmationDialog confirmModal={confirmModal} />}
    </div>
  );
};

const resourceTableHeadings = [
  {
    text: "Thumbnail",
  },
  {
    text: "Title",
  },
  {
    text: "Description",
  },

  {
    text: "File ",
  },
];

export default AllResources;
