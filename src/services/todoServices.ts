import { notification } from "antd";
import axiosInstance from "../api";
import { TODO } from "../api/endpoint";
import { ICreateTodo, IUpdateTodo } from "./type";
import { Todo } from "../redux/todo/types";
import { AxiosResponse } from "axios";

export const getOneTodo = async (id: string) => {
  try {
    const { data }: AxiosResponse<Todo> = await axiosInstance.get(`TODO/${id}`);

    return {
      data,
      status: true,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    notification.error({
      message: "Ошибка",
      description: errorMessage,
      duration: 3,
      placement: "topRight",
    });
    return {
      status: false,
    };
  }
};

export const createTodo = async (params: ICreateTodo) => {
  try {
    const { data } = await axiosInstance.post(TODO, params);
    notification.success({
      message: "Успех",
      description: "Задача успешно добавлена",
      duration: 3,
      placement: "topRight",
    });
    return {
      data,
      status: true,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    notification.error({
      message: "Ошибка",
      description: errorMessage,
      duration: 3,
      placement: "topRight",
    });
    return {
      status: false,
    };
  }
};

export const updateTodo = async (params: IUpdateTodo) => {
  try {
    await axiosInstance.patch(`${TODO}/${params._id}`, params);
    notification.success({
      message: "Успех",
      description: "Задача успешно отредактирована",
      duration: 3,
      placement: "topRight",
    });
    return {
      status: true,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    notification.error({
      message: "Ошибка",
      description: errorMessage,
      duration: 3,
      placement: "topRight",
    });
    return {
      status: false,
    };
  }
};

export const removeTodo = async (id: string) => {
  try {
    await axiosInstance.delete(`${TODO}/${id}`);
    notification.success({
      message: "Успех",
      description: "Задача успешно удалена",
      duration: 3,
      placement: "topRight",
    });
    return {
      status: true,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    notification.error({
      message: "Ошибка",
      description: errorMessage,
      duration: 3,
      placement: "topRight",
    });
    return {
      status: false,
    };
  }
};
