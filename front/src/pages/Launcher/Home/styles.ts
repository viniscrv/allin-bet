import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
    width: 600,
    lineHeight: 1.4,
    fontSize: "$md",

    h2: {
        fontSize: "$lg2",
        margin: "1rem 0"
    },
    p: {
        color: "$gray300",
        margin: ".5rem 0"
    },
    "span, a": {
        color: "$primary500"
    },

    "@bp1": {
        width: "100%",
        padding: "0 16px"
    }
});
