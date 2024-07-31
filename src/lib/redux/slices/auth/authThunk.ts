import axios, { AxiosError } from "axios";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IUserPassword } from "@/types/users";


interface ILogin {
  email: string;
  password: string;
}

interface IRegisterAdmin {
  name: string;
  email: string;
  role: string;
}
interface IRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

const baseUrl = "https://api.niprfct.org.ng/api"

// Add a request interceptor
const axiosInstance = axios.create({
  baseURL: baseUrl,
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

export const regiterAdmin = createAppAsyncThunk(
  "auth/regiterAdmin",
  async (data: IRegisterAdmin, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `${baseUrl}/user/register-admin`,

        data
      );

      return { user: res.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue("Could not Get All Groups");
    }
  }
);
export const login = createAppAsyncThunk(
  "auth/login",
  async (postPayload: ILogin, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseUrl}/auth/signin`,

        postPayload
      );
      const userData = res.data?.data;

      sessionStorage.setItem("userProfile", JSON.stringify(userData));
      sessionStorage.setItem("authToken", res.data?.token);

      return { user: userData, token: res.data.token };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Login User");
    }
  }
);
export const register = createAppAsyncThunk(
  "auth/register",
  async (postPayload: IRegister, thunkAPI) => {
    try {
      await axios.post(
        `/auth/register`,

        postPayload
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Login User");
    }
  }
);

export const forgotPassswordHandler = createAppAsyncThunk(
  "auth/forgotPasssword",
  async (email: string, thunkAPI) => {
    try {
      const res = await axios.post(
        `/auth/forgot-password`,

        { email }
      );

      return { user: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could Request Password Reset");
    }
  }
);

export interface IResetPassword {
  otp: string;
  password: string;
  password_confirmation: string;
}

export const resetPassword = createAppAsyncThunk(
  "auth/resetPassword",
  async (data: IResetPassword, thunkAPI) => {
    try {
      const res = await axios.post(
        `/auth/reset-password`,

        data
      );

      return { user: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Reset password");
    }
  }
);

export const updateUserProfileDetails = createAppAsyncThunk(
  "auth/updateUserProfileDetails",
  async (
    data: {
      name: string;
      email: string;
      phone: string;
      address: string;
      lga_id: string;
      state_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post(`/user/update/profile`, data);
      const userProfileRetrieved = sessionStorage.getItem("userProfile");

      if (userProfileRetrieved) {
        sessionStorage.setItem(
          "userProfile",
          JSON.stringify({
            ...JSON.parse(userProfileRetrieved),
            ...res.data?.data,
          })
        );
      }

      return { user: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Update your profile");
    }
  }
);

export const changeUserPassword = createAppAsyncThunk(
  "auth/changeUserPassword",
  async (data: IUserPassword, thunkAPI) => {
    try {
      await axiosInstance.post(
        `/user/change-password`,

        data
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Could not Change Password");
    }
  }
);
