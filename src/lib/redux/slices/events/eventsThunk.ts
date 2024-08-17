import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { INewEvent } from "@/types/event";
// import { IMembershipForm } from "@/types/membership";

// Add a request interceptor
const axiosInstance = axios.create({
  baseURL: "https://api.niprfct.org.ng/api",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const fetchAllEvents = createAppAsyncThunk(
  "events/fetchAllEvents",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/event`);

      return res.data.data.events;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get all Events");
    }
  }
);
export const fetchEventById = createAppAsyncThunk(
  "events/fetchEventById",
  async (eventId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/event/${eventId}`);

      return res.data.data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single Event");
    }
  }
);

export const fetchEventWithAttendace = createAppAsyncThunk(
  "events/fetchEventWithAttendace",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/event/with/attendance`);

      return res.data.data.events;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single Event");
    }
  }
);

export const createNewEvent = createAppAsyncThunk(
  "events/createNewEvent",
  async (payload: FormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/event`, payload);

      return res.data.data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single Event");
    }
  }
);

interface IUpdateEvent {
  payload: INewEvent;
  eventId: string;
}

export const updateEvent = createAppAsyncThunk(
  "events/updateEvent",
  async ({ eventId, payload }: IUpdateEvent, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/event/update/${eventId}`, payload);

      return res.data.data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single Event");
    }
  }
);

interface IUpdateEventImage {
  data: FormData;
  eventId: string;
}

export const updateEventImage = createAppAsyncThunk(
  "events/updateEventImage",
  async ({ eventId, data }: IUpdateEventImage, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `/event/update-image/${eventId}`,
        data
      );

      return res.data.data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single Event");
    }
  }
);
export const deleteEvent = createAppAsyncThunk(
  "events/deleteEvent",
  async (eventId: number, thunkAPI) => {
    try {
      await axiosInstance.delete(`/event/delete/${eventId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single Event");
    }
  }
);
