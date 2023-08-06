import { keyframes, styled } from "../../../stitches.config";

const slideIn = keyframes({
    from: {
        transform: "translateX(100%)"
    },
    to: {
        transform: "translateX(0)"
    }
});
const slideOut = keyframes({
    from: {
        transform: "translateX(0)"
    },
    to: {
        transform: "translateX(100%)"
    }
});

export const Container = styled("div", {
    ".ToastViewport": {
        position: "fixed",
        bottom: "0",
        right: "0",
        width: "360px",
        minHeight: "70px",
        maxWidth: "100vw",
        listStyle: "none",
        zIndex: 2147483647,
        margin: "0 16px 16px 0"
    },
    ".toast-root": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid $gray200",
        backgroundColor: "$gray900",
        borderRadius: "4px",
        gap: 10,

        "&[data-state='open']": {
            animation: `${slideIn} .3s cubic-bezier(0.16, 1, 0.3, 1)`
        },

        "&[data-state='closed']": {
            animation: `${slideOut} .3s ease-in`
        },

        ".content": {
            display: "flex",
            gap: 20,
            ".color-green": {
                backgroundColor: "$green700",
                display: "block",
                width: 3
            },

            ".color-red": {
                backgroundColor: "$red700",
                display: "block",
                width: 3
            },
            ".content-text": {
                padding: "10px 0",
                h4: {
                    marginBottom: ".5rem",
                    fontSize: "1.1rem"
                },
                span: {
                    fontSize: "1rem",
                    color: "$gray300"
                }
            }
        },
        ".close-btn": {
            all: "unset",
            padding: "10px 20px",
            cursor: "pointer"
        }
    }
});
