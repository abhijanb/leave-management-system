import { themeSlice } from "@/features/ThemeToggle/themeSlice";
import { sidebarSlice } from "@/features/manager/components/ui/Sidebar/sidebarSlice";
import authSlice from "@/features/auth/authSlice";
import { baseApi } from "./baseApi";

export const reducers = {
    auth: authSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [sidebarSlice.name]: sidebarSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
};