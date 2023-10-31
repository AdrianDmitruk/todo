import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchUser } from "./async-actions";
import { Status, User, UserSliceState } from "./types";

const initialState: UserSliceState = {
  data: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    passwordHash: "",
    avatarUrl: "",
    tasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  status: Status.SECCESS,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDataUser(state, action: PayloadAction<User>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUser.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setDataUser } = userSlice.actions;

export default userSlice.reducer;
