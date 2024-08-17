export interface INews {
  id: number;
  user_id: number;
  title: string;
  image: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface IAddNews {
  post_id: number;
  title: string;
  body: string;
}
