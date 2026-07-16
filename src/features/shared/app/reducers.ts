import { themeSlice } from "@/features/ThemeToggle/themeSlice";
import { baseApi } from "./baseApi";

export const reducers = {
    [themeSlice.name]: themeSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
}