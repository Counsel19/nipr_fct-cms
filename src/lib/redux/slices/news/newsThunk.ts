import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IAddNews } from "@/types/news";
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

export const fetchAllNewsPost = createAppAsyncThunk(
  "news/fetchAllNewsPost",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/post`);

      return res.data.data.posts;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get all News Post");
    }
  }
);
export const fetchNewsPostById = createAppAsyncThunk(
  "news/fetchNewsPostById",
  async (newsId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/post/${newsId}`);

      return res.data.data.Post;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get single News Post");
    }
  }
);

export const createNewsPost = createAppAsyncThunk(
  "news/createNewEvent",
  async (payload: FormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/post`, payload);

      return res.data.data.post;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Create News Post");
    }
  }
);

interface IUpdateEvent {
  payload: IAddNews;
  postId: number;
}

export const updateNewsPost = createAppAsyncThunk(
  "news/updateNewsPost",
  async ({ postId, payload }: IUpdateEvent, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/post/update/${postId}`, payload);

      return res.data.data.post;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Update News Post");
    }
  }
);

interface IUpdateNewsPostImage {
  data: FormData;
  newsId: number;
}

export const updateNewsPostImage = createAppAsyncThunk(
  "news/updateNewsPostImage",
  async ({ newsId, data }: IUpdateNewsPostImage, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `/post/update-image/${newsId}`,
        data
      );

      return res.data.data.posts;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Update News Post");
    }
  }
);
export const deleteNewsPost = createAppAsyncThunk(
  "news/deleteNewsPost",
  async (newsId: number, thunkAPI) => {
    try {
      await axiosInstance.delete(`/post/delete/${newsId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Delete News Post");
    }
  }
);
