import { IMembership } from "@/types/membership";
import { FC } from "react";
import LabledInput from "../shared/molecules/LabeledInput";
import { format } from "date-fns";

interface BasicDetailsFormProps {
  inputValue: IMembership;
}
const BasicDetailsForm: FC<BasicDetailsFormProps> = ({ inputValue }) => {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <LabledInput
          className="bg-slate-100"
          value={inputValue.sur_name}
          label="Surname"
          name="sur_name"
        />

        <div className="grid lg:grid-cols-2  gap-8">
          <LabledInput
            className="bg-slate-100"
            value={inputValue.middle_name}
            label="Middle Name"
            name="middle_name"
          />
          <LabledInput
            className="bg-slate-100"
            value={inputValue.first_name}
            label="First Name"
            name="first_name"
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <LabledInput
            className="bg-slate-100"
            value={
              inputValue.dob ? format(inputValue.dob, "do, MMM, yyyy") : "N/A"
            }
            label="Date of birth"
            name="dob"
          />
          <LabledInput
            className="bg-slate-100"
            value={inputValue.phone}
            label="Phone Number"
            name="phone"
          />
        </div>

        <LabledInput
          className="bg-slate-100"
          value={inputValue.email}
          label="Email"
          name="email"
        />
      </div>

      <div className="space-y-8">
        <LabledInput
          className="bg-slate-100"
          value={inputValue.job_title}
          label="Job Title/Job Position"
          name="job_title"
        />
        <LabledInput
          className="bg-slate-100"
          value={inputValue.responsibility}
          label="Responsibile To"
          name="responsibility"
        />
        <LabledInput
          className="bg-slate-100"
          value={inputValue.organization}
          label="Organization"
          name="organization"
        />
        <LabledInput
          className="bg-slate-100"
          value={inputValue.business_address}
          label="Business Address"
          name="business_address"
        />
        <LabledInput
          className="bg-slate-100"
          value={inputValue.business_postal_code}
          label="Business Postal address"
          name="business_postal_code"
        />
        <LabledInput
          className="bg-slate-100"
          value={inputValue.industry}
          label="Industry ( nature of your organization's business or activity)"
          name="industry"
        />
      </div>
    </div>
  );
};

export default BasicDetailsForm;
