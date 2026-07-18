import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserRole } from "../shared/types";

interface AuthState {
  email: string | null;
  role: UserRole | null;
  name: string | null;
}

function load(): AuthState {
  if (typeof window === "undefined") return { email: null, role: null, name: null };
  try {
    const raw = localStorage.getItem("auth");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { email: null, role: null, name: null };
}

function save(state: AuthState) {
  try {
    localStorage.setItem("auth", JSON.stringify(state));
  } catch {}
}

const initialState: AuthState = load();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ email: string; role: UserRole; name: string }>) {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.name = action.payload.name;
      save({ email: state.email, role: state.role, name: state.name });
    },
    clearUser(state) {
      state.email = null;
      state.role = null;
      state.name = null;
      save({ email: null, role: null, name: null });
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice;
