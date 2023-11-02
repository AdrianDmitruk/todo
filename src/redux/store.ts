import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth/slice";
import user from "./user/slice";
import todo from "./todo/slice";

export const store = configureStore({
  reducer: {
    auth,
    user,
    todo,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
