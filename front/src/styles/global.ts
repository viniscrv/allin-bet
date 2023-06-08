import { globalCss } from "../../stitches.config";

export const globalStyles = globalCss({
    "*": { 
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        color: "$white"
    },
    "body": {
        backgroundColor: "$gray900"
    }
});
