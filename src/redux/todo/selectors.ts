import { RootState } from "../store";

export const selectTodoData = (state: RootState) => state.todo;
