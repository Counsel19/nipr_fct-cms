import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum UserStatus {
  notApproved,
  approve,
}
export enum UserPaymenrStatus {
  inactive,
  active,
}

export enum EventType {
  free = "free",
  paid = "paid",
}
export enum GalleryItemType {
  image = "image",
  video = "video",
}
