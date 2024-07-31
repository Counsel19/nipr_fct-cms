import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { IResource } from "@/types/resources";
import ResourceCard from "@/components/resources/ResourceCard";
import { Skeleton } from "@mui/material";

interface ResourcesProps {}
const Resources: FC<ResourcesProps> = () => {
//   const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState<IResource[] | null>(null);

  const getResources = async () => {
    try {
      setLoading(true);
      setResources([
        {
          id: 1,
          title: "babalawo",
          path: "https://images.unsplash.com/photo-1721742149306-879cf7498eb7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          type: "image",
          description: "Something",
          created_at: "2024-07-29T12:42:00.000000Z",
          updated_at: "2024-07-29T12:42:00.000000Z",
        },
        {
          id: 2,
          title: "babalawo cap",
          path: "https://images.unsplash.com/photo-1721742149306-879cf7498eb7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          type: "image",
          description: "Something",
          created_at: "2024-07-29T12:42:36.000000Z",
          updated_at: "2024-07-29T12:42:36.000000Z",
        },
      ]);
    } catch (error) {
      toast({
        title: "Error fetching Resources",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <div className="p-8 space-y-12">
      <div className=" flex justify-between mt-5">
        <h4 className="text-black text-xl font-semibold">Resources</h4>
        <button
          type="button"
        //   onClick={() => setAddOpen(true)}
          className="flex items-center justify-center border-none rounded-xl gap-3 w-[164px] h-[40px] bg-[#6FCF97]"
        >
          <Plus className="text-[#fff]" />
          <p className="text-[#fff] font-poppins font-medium text-base">
            Add Resources
          </p>
        </button>
      </div>

      <div className="flex items-center ">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className="w-full"
        >
          <div>
            {loading ? (
              <Skeleton
                variant="rectangular"
                width={500}
                height={1000}
                style={{ backgroundColor: "rgba(0,0,0, 0.06)" }}
              />
            ) : (
              <div
                className={`${
                  resources && resources?.length > 0
                    ? "grid grid-cols-3 gap-[32px]"
                    : "flex items-center justify-center"
                } mt-[29px]`}
              >
                {resources && resources?.length > 0 ? (
                  resources?.map((item, index) => (
                    <React.Fragment key={index}>
                      <ResourceCard {...item} />
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-2xl text-[#000] text-center font-semibold">
                    No Images Available
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
