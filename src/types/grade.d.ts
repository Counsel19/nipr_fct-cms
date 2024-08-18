export interface IGrade {
  id: number;
  name: string;
  amount: string;
  desc: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateGrade {
  name: string;
  amount: string;
  desc: string;
}
