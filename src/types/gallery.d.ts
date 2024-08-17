import { GalleryItemType } from "@/lib/utils";

export interface IGallery {
  id: number;
  title: string;
  path?: string;
  file: File | null;
  type: GalleryItemType;
  created_at: string;
}
