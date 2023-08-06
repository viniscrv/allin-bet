import * as ToastRadix from "@radix-ui/react-toast";
import { useContext, useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import { X } from "@phosphor-icons/react";
import { ToastContext } from "../../contexts/ToastContext";

export function Toast() {
    const [open, setOpen] = useState(false);

    const { stateToast, toastContent } = useContext(ToastContext);
    const { title, description, color } = toastContent;

    const timerRef = useRef(0);

    useEffect(() => {
        if (Object.values(toastContent).length) {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
                setOpen(true);
            }, 100);
        }
    }, [stateToast]);

    return (
        <Container>
            <ToastRadix.Provider swipeDirection="right" duration={3000}>
                <ToastRadix.Root
                    className="toast-root"
                    open={open}
                    onOpenChange={setOpen}
                >
                    <div className="content">
                        <div className={`color-${color}`}></div>
                        <div className="content-text">
                            <h4>{title}</h4>
                            <span>{description}</span>
                        </div>
                    </div>
                    <ToastRadix.Action asChild altText="close">
                        <button className="close-btn">
                            <X size={24} />
                        </button>
                    </ToastRadix.Action>
                </ToastRadix.Root>
                <ToastRadix.Viewport className="ToastViewport" />
            </ToastRadix.Provider>
        </Container>
    );
}
