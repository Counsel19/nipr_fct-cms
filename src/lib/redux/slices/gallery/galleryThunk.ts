import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
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

export const fetchGallery = createAppAsyncThunk(
  "gallery/fetchGallery",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/gallery`);

      return res.data.data.gallery;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Gallery");
    }
  }
);
export const addToGallery = createAppAsyncThunk(
  "gallery/addToGallery",
  async (payload: FormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/gallery`, payload);

      return res.data.data.Item;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Gallery");
    }
  }
);
export const deleteItemFromGallery = createAppAsyncThunk(
  "gallery/deleteItemFromGallery",
  async (itemId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/gallery/delete/${itemId}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Delete Gallery Item");
    }
  }
);
