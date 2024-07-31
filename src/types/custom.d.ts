export interface IHeadingList {
    text: string;
    icon?: ReactNode;
    onIconClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  }
  export interface IPagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    next_page_url: string;
    prev_page_url: string | null;
  }
  