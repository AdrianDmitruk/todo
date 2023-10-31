import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOKEN_JWT } from "../../constans";
import { fetchLogin } from "./async-actions";
import { AuthResponse, AuthSliceState, Status } from "./types";

const initialState: AuthSliceState = {
  data: {
    _id: "",
    fullName: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    todos: [],
    tasks: [],
    token: localStorage.getItem(TOKEN_JWT) || null,
  },
  status: Status.SECCESS,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDataAuth(state, action: PayloadAction<AuthResponse>) {
      state.data = action.payload;
    },

    logout(state) {
      state.data.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING;
      state.data.token = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR;
      state.data.token = null;
    });
  },
});

export const { setDataAuth, logout } = authSlice.actions;

export default authSlice.reducer;
