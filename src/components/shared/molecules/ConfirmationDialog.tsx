import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { closeModal } from "@/lib/redux/slices/dialogSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ConfirmationDialogProps {
  confirmModal?: () => void;
}
const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ confirmModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { dialogInfo } = useSelector((store: RootState) => store.dialog);
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModel = () => {
    dispatch(closeModal());
  };

  const handleConfirmModel = async () => {
    setIsLoading(true);
    try {
      if (confirmModal) {
        await confirmModal();
      }
      handleCloseModel();
    } catch (error) {
      console.log(error);

      return toast({
        title: "Error Toggle User Status",
        description: "Unable to toggle user status! Try again latter",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-[#344054B2] z-12 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-8 text-center sm:items-center sm:p-0">
          <div className="relative transform w-[42rem] min-h-[24.9rem] flex flex-col justify-between p-12 overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all">
            <div className=" space-y-8">
              <div
                className={`w-fit flex justify-center items-center p-1  rounded-full ${dialogInfo?.iconBg} border-8 ${dialogInfo?.iconBorderColor}`}
              >
                {dialogInfo?.icon}
              </div>
              <div className="flex items-start mb-3">
                <div className="mt-3">
                  <h3
                    className="text-xl font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {dialogInfo?.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-base text-gray-500">
                      {dialogInfo?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 flex justify-around gap-8">
              <Button
                onClick={handleCloseModel}
                variant={"outline"}
                className="flex-1 bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onClick={handleConfirmModel}
                className={` ${dialogInfo?.primaryColor} hover:${dialogInfo?.iconBg} flex-1`}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
