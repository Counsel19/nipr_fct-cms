import { IMembership } from "@/types/membership";
import { FC, useEffect } from "react";
import LabledInput from "../shared/molecules/LabeledInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchAllGrades } from "@/lib/redux/slices/grade/gradeThunk";
import CustomLoader from "../shared/atoms/CustomLoader";
import { format } from "date-fns";

const isDevotionList = [
  {
    name: "Some",
    id: 0,
  },
  {
    name: "All",
    id: 1,
  },
];
const isPrimaryFunctionList = [
  {
    name: "No",
    id: 0,
  },
  {
    name: "Yes",
    id: 1,
  },
];
const isMemberList = [
  {
    name: "No",
    id: 0,
  },
  {
    name: "Yes",
    id: 1,
  },
];

interface CareerDetailsProps {
  inputValue: IMembership;
}
const CareerDetails: FC<CareerDetailsProps> = ({ inputValue }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allGrades } = useSelector((store: RootState) => store.grade);
  console.log(inputValue, "inputValue");
  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchAllGrades());
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <div className="space-y-4">
          {/* {devotion.name} */}
          <LabledInput
            className="bg-slate-100"
            value={
              isDevotionList.find((item) => item.id == inputValue.is_devotion)
                ?.name || "N/A"
            }
            label="Do you devote some/all of your time to public relations practice"
            name="nature_of_duties"
          />
        </div>
        <LabledInput
          className="bg-slate-100"
          value={inputValue.nature_of_duties}
          isTextArea
          label=" Explain the nature of your duties"
          name="nature_of_duties"
        />

        <LabledInput
          className="bg-slate-100"
          value={
            isPrimaryFunctionList.find(
              (item) => item.id == inputValue.is_primary_function
            )?.name || "N/A"
          }
          isTextArea
          label="Is your public relations work recognized by your organizations as
            your primary function"
          name="is_primary_function"
        />

        <LabledInput
          className="bg-slate-100"
          value={
            isMemberList.find((item) => item.id == inputValue.is_member)
              ?.name || "N/A"
          }
          label="Are you already a member of the Nigerian Institute of public
            relations?"
          name="is_member"
        />

        {allGrades ? (
          <LabledInput
            className="bg-slate-100"
            value={
              allGrades.find(
                (item) => item.id.toString() === inputValue.grade_id
              )?.name || "N/A"
            }
            label="if yes, what is your current grade of membership?"
            name="grade_id"
          />
        ) : (
          <div>
            <CustomLoader height={24} width={24} />
          </div>
        )}

        <LabledInput
          className="bg-slate-100"
          value={
            inputValue.curernt_grade_date
              ? format(inputValue.curernt_grade_date, "do, MMM, yyyy")
              : "N/A"
          }
          label="Date elected to your current grade"
          name="curernt_grade_date"
        />
      </div>

      <h4 className="text-2xl leading-[2.8rem]">
        Qualification/membership of professional bodies
      </h4>

      {inputValue.qualifications && inputValue.qualifications[0] && (
        <div className="space-y-8">
          <LabledInput
            className="bg-slate-100"
            value={inputValue.qualifications[0].qualification_name}
            label="Name of professional body"
            name="qualification_name"
          />
          <div>
            <img
              className="h-[200px]"
              src={
                inputValue.qualifications[0].qualification_image ||
                "/images/no-image-placeholder.png"
              }
              alt={inputValue.qualifications[0].qualification_name}
            />
          </div>
        </div>
      )}
      {inputValue.qualifications && inputValue.qualifications[1] && (
        <div className="space-y-8">
          <LabledInput
            className="bg-slate-100"
            value={inputValue.qualifications[1].qualification_name}
            label="Name of professional body"
            name="qualification_name"
          />
          <div>
            <img
              className="h-[200px]"
              src={
                inputValue.qualifications[1].qualification_image ||
                "/images/no-image-placeholder.png"
              }
              alt={inputValue.qualifications[1].qualification_name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDetails;
