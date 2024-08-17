import { EventType } from "@/lib/utils";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  poster_image: File | string;
  fee: string | null;
  start_date: string;
  end_date: string;
  type: EventType;
  created_at: string;
  updated_at: string;
}

export interface IEventAttendant {
  id: number;
  event_id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  email: string;
  dob: string;
  age: number;
  ticket_number: string;
  created_at: string;
  updated_at: string;
}

export interface IEventWithAttendace {
  id: number;
  title: string;
  description: string;
  location: string;
  poster_image: File | string;
  fee: string | null;
  start_date: string;
  end_date: string;
  type: EventType;
  created_at: string;
  updated_at: string;
  attendace: IEventAttendant[];
}

export interface INewEvent {
  title: string;
  description: string;
  location: string;
  poster_image: File | null | string;
  start_date: Date | null;
  end_date: Date | null;
  type: EventType | null;
  fee: string;
}
