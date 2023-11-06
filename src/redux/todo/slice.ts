import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchTodo } from "./async-actions";
import { Status, Todo, UserSliceState } from "./types";

const initialState: UserSliceState = {
  data: [
    {
      startTime: "",
      _id: "",
      title: "",
      description: "",
      day: "",
      month: "",
      year: "",
      started: false,
      completed: false,
      timeTaken: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    },
  ],
  status: Status.SECCESS,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setDataTodo(state, action: PayloadAction<Todo[]>) {
      const processedData = action.payload.map((todo) => {
        return {
          ...todo,
        };
      });
      state.data = processedData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchTodo.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchTodo.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setDataTodo } = todoSlice.actions;

export default todoSlice.reducer;
