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

export const fetchResource = createAppAsyncThunk(
  "resource/fetchResource",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/resource`);

      return res.data.data.resources;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Resource");
    }
  }
);
export const fetchSingleResource = createAppAsyncThunk(
  "resource/fetchSingleResource",
  async (resoureId:string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/resource/${resoureId}`);

      return res.data.data.resource;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Resource");
    }
  }
);
export const addResource = createAppAsyncThunk(
  "resource/addResource",
  async (payload: FormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/resource/create`, payload);

      return res.data.data.Resource;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Resource");
    }
  }
);

type RUpdateType = {
  resource_id: string;
  title: string;
  desc: string;
};

export const updateResource = createAppAsyncThunk(
  "resource/updateResource",
  async (payload: RUpdateType, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/resource/update`, payload);

      return res.data.data.Resource;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Resource");
    }
  }
);
export const updateResourceFile = createAppAsyncThunk(
  "resource/updateResourceFile",
  async (payload: FormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/resource/update/file`, payload);

      return res.data.data.Resource;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Resource");
    }
  }
);
export const updateResoureThumbnail = createAppAsyncThunk(
  "resource/updateResoureThumbnail",
  async (payload: FormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/resource/update/thumbnail`, payload);

      return res.data.data.Resource;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Resource");
    }
  }
);

export const deleteResources = createAppAsyncThunk(
  "resource/deleteResources",
  async (itemId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/resource/delete/${itemId}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Delete Resource Item");
    }
  }
);
