import { FC } from "react";

interface BrandingProps {}
const Branding: FC<BrandingProps> = () => {
  return (
    <div className="flex items-end gap-3 w-[10rem] lg:w-fit ">
      <img src="/images/brand.svg" alt="NIPR Logo" className="object-cover" />
      <img
        src="/images/global_alliance.svg"
        alt="NIPR Member of Gloabl Alliance"
       className="object-cover"
      />
    </div>
  );
};

export default Branding;
