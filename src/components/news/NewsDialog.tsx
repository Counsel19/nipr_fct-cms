import React, { FC, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface NewsDialogProps {
  dialogElement: ReactNode;
  actionBtn: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewsDialog: FC<NewsDialogProps> = ({
  dialogElement,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="font-base h-full"></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {dialogElement}
      </DialogContent>
    </Dialog>
  );
};

export default NewsDialog;
