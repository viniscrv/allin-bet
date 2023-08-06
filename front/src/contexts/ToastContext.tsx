import { createContext, ReactNode, useState } from "react";

interface ToastContextType {
    stateToast: boolean;
    toastContent: ToastContent;
    shootToast: ({ title, description }: ToastContent) => void;
}

interface ToastContent {
    title: string;
    description: string;
    color: "green" | "red"
}

export const ToastContext = createContext({} as ToastContextType);

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastContextProvider({ children }: ToastProviderProps) {
    const [stateToast, setStateToast] = useState(false);
    const [toastContent, setToastContent] = useState({} as ToastContent);

    function shootToast({ title, description, color }: ToastContent) {
        setToastContent({ title, description, color });
        setStateToast(!stateToast);
    }

    return (
        <ToastContext.Provider value={{ shootToast, stateToast, toastContent }}>
            {children}
        </ToastContext.Provider>
    );
}
