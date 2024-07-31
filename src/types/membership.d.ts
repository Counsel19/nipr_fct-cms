import { UserPaymenrStatus, UserStatus } from "@/lib/utils";

export interface IQalification {
  qualification_name: string;
  qualification_image: string;
}

export interface IGrade {
  id: number;
  name: string;
  amount: number;
  desc: string;
  created_at: string;
  updated_at: string;
}

export interface IMembership {
  id: number;
  sur_name: string;

  first_name: string;

  middle_name: string;

  email: string;

  phone: string;

  job_title: string;

  responsibility: string;

  organization: string;

  business_address: string;

  business_postal_code: string;

  industry: string;

  is_devotion: number;

  nature_of_duties: string;

  is_primary_function: number;

  is_member: number;

  grade_id: string;
  curernt_grade_date: string;
  dob: string;
  status: UserStatus;
  payment_link?: string;
  practice_id: string;
  pic: string;
  yearly_dues: UserPaymenrStatus;

  qualifications: IQalification[];
  grade: IGrade;
  created_at: string;
}
