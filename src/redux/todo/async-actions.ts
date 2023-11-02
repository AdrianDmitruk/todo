import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api";
import { GET_TODOS } from "../../api/endpoint";

import { setDataTodo } from "./slice";
import { notification } from "antd";
import { Todo } from "./types";
import { AxiosResponse } from "axios";

export const fetchTodo = createAsyncThunk(
  "todo/fetchTodoStatus",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<Todo[]> = await axiosInstance.get<Todo[]>(
        `${GET_TODOS}`
      );
      const data = response.data;
      dispatch(setDataTodo(data));
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
