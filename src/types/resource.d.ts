export interface IResource {
  id: number;
  title: string;
  desc: string;
  file: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface IAddNewResource {
  title: string;
  desc: string;
  file: File | null | string;
  thumbnail: File | null | string;
}

