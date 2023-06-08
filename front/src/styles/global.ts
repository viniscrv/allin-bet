import { globalCss } from "../../stitches.config";

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
    }
});
