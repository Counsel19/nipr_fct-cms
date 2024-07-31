import { FC, useState } from "react";
import { Button } from "../ui/button";

interface DeleteNewsProps {
  handleClose: () => void;
}
const DeleteNews: FC<DeleteNewsProps> = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const deleteBlog = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col bg-[#fff] w-8/12 md:w-[327px] xs:h-[150px] md:h-[200px] p-8">
      <div className="flex flex-col text-center gap-3">
        <p className="text-[#000] font-bold text-3xl">Are you sure?</p>
        <p className="text-[#000] ">
          Once you click Delete the blog can't be retrieve again
        </p>
      </div>
      <div className="flex justify-between mt-10">
        <Button type="button" onClick={handleClose} variant={"outline"}>
          Cancel
        </Button>
        <Button isLoading={loading} type="submit" onClick={() => deleteBlog()}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteNews;
