export interface Todo {
  startTime: string;
  _id: string;
  title: string;
  description: string;
  day: string;
  month: string;
  year: string;
  started: boolean;
  completed: boolean;
  timeTaken: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum Status {
  LOADING = "loading",
  SECCESS = "seccess",
  ERROR = "error",
}

export type UserSliceState = {
  data: Todo[];
  status: Status;
};

export type ITodoParams = {
  day?: number;
  month?: number;
  year?: number;
};
