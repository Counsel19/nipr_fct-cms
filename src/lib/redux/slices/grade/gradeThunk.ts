import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { ICreateGrade } from "@/types/grade";
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

export const fetchAllGrades = createAppAsyncThunk(
  "grade/fetchAllGrades",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/grade`);

      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get all Grades");
    }
  }
);
export const fetchGradeById = createAppAsyncThunk(
  "grade/fetchGradeById",
  async (gradeId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/grade/${gradeId}`);

      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get all Grades");
    }
  }
);



export const createGrade = createAppAsyncThunk(
  "grade/createGrade",
  async (payload: ICreateGrade, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/grade`, payload);

      return res.data.data.grade;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Create Grade");
    }
  }
);

interface IGradeUpdatePayload {
  payload: ICreateGrade,
  gradeId: number
}

export const updateGrade = createAppAsyncThunk(
  "grade/updateGrade",
  async ({ payload, gradeId }: IGradeUpdatePayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/grade/update/${gradeId}`, payload);

      return res.data.data.grade;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get all Grades");
    }
  }
);

export const deleteGrade = createAppAsyncThunk(
  "grade/deleteGrade",
  async (itemId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/grade/delete/${itemId}`);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Get Gallery");
    }
  }
);
