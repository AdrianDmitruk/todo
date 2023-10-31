import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api";
import { GET_USER } from "../../api/endpoint";

import { setDataUser } from "./slice";
import { notification } from "antd";
import { User } from "./types";

export const fetchUser = createAsyncThunk(
  "user/fetchUserStatus",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<User>(`${GET_USER}`);
      console.log(data);

      dispatch(setDataUser(data));
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
