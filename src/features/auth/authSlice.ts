import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  role: string | null;
}

function load(): AuthState {
  if (typeof window === "undefined") return { email: null, role: null };
  try {
    const raw = localStorage.getItem("auth");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { email: null, role: null };
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
    setUser(state, action: PayloadAction<{ email: string; role: string }>) {
      state.email = action.payload.email;
      state.role = action.payload.role;
      save({ email: state.email, role: state.role });
    },
    clearUser(state) {
      state.email = null;
      state.role = null;
      save({ email: null, role: null });
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice;
