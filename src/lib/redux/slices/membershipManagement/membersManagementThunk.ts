import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

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

export const fetchAllApprovedMembers = createAppAsyncThunk(
  "membersManagement/fetchAllApprovedMembers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/user/members/approved`);

      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could Fetch all Approved Members");
    }
  }
);
export const fetchAllPendingMembers = createAppAsyncThunk(
  "membersManagement/fetchAllPendingMembers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/user/members/pending`);

      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could Fetch all Peding Members");
    }
  }
);
export const fetchAllPaidMembers = createAppAsyncThunk(
  "membersManagement/fetchAllPaidMembers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/user/members/paid`);

      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could Fetch all Paid Members");
    }
  }
);
export const fetchAllActiveMembers = createAppAsyncThunk(
  "membersManagement/fetchAllActiveMembers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/user/members/dues/active`);

      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could Fetch all Active Members");
    }
  }
);
export const fetchAllInactiveMembers = createAppAsyncThunk(
  "membersManagement/fetchAllInactiveMembers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/user/members/dues/inactive`);

      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could Fetch all InActive Members");
    }
  }
);
export const approveMembership = createAppAsyncThunk(
  "membersManagement/approveMembership",
  async (memberId: number, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `user/members/application/approve/${memberId}`
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could Fetch all InActive Members");
    }
  }
);
export const fetchMemberById = createAppAsyncThunk(
  "membersManagement/fetchMemberById",
  async (memberId: number, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`user/${memberId}`);

      return res.data.data.user[0];
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could Fetch all InActive Members");
    }
  }
);
