'use client'

import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster position="top-right" richColors />
            <Provider store={store}>
                {children}
            </Provider>
        </>
    )
}