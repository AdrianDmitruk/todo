import { createAsyncThunk } from "@reduxjs/toolkit";

import { AuthResponse, IAuthData } from "./types";

import axiosInstance from "../../api";
import { AUTH_LOGIN, AUTH_REGISTRATION } from "../../api/endpoint";

import { TOKEN_JWT } from "../../constans";
import { setDataAuth } from "./slice";
import { notification } from "antd";

export const fetchLogin = createAsyncThunk(
  "login/fetchLoginStatus",
  async (params: IAuthData, { dispatch, rejectWithValue }) => {
    try {
      const endpoint = params.firstName ? AUTH_REGISTRATION : AUTH_LOGIN;
      const { data } = await axiosInstance.post<AuthResponse>(endpoint, params);

      if (data?.token) {
        localStorage.setItem(TOKEN_JWT, data.token);
      }

      dispatch(setDataAuth(data));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      notification.error({
        message: "Ошибка",
        description: errorMessage,
        duration: 3,
        placement: "topRight",
      });

      return rejectWithValue(errorMessage);
    }
  }
);
