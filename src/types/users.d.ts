import { UserRole } from "@/kits/data/user";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  email_verified_at: string | null;
  address: string | null;
  state_id: string | null;
  lga_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface IUserPassword {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface IGuestUser {
  name: string;
  email: string;
}
