import { globalCss } from "../../stitches.config";
import 'react-loading-skeleton/dist/skeleton.css';

export const globalStyles = globalCss({
    "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        color: "$white",
        fontFamily: "Roboto, sans-serif"
    },
    body: {
        backgroundColor: "$gray900"
    },
    input: {
        "&:focus": {
            outline: "transparent",
            boxShadow: "0 0 0 2px $colors$primary500"
        }
    },
    "::selection": {
        backgroundColor: "#be123c70"
    },
    "::-webkit-scrollbar": {
        width: "18px"
    },
    "::-webkit-scrollbar-track": {
        background: "$gray900"
    },
    "::-webkit-scrollbar-thumb": {
        background: "$gray800"
    },
    button: {
        "&:disabled": {
            cursor: "not-allowed !important"
        }
    }
});
