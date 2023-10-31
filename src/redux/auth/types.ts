export interface AuthResponse {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  todos: string[];
  tasks: string[];
  token: string | null;
}

export enum Status {
  LOADING = "loading",
  SECCESS = "seccess",
  ERROR = "error",
}

export type AuthSliceState = {
  data: AuthResponse;
  status: Status;
};

export interface IAuthData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
