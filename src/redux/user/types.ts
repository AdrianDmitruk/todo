export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  tasks: string[];
  createdAt: string;
  updatedAt: string;
}

export enum Status {
  LOADING = "loading",
  SECCESS = "seccess",
  ERROR = "error",
}

export type UserSliceState = {
  data: User;
  status: Status;
};

export interface IUserData {
  id: string;
}
