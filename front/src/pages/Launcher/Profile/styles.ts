import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
    main: {
        maxWidth: "1000px",
        margin: "8px 0",
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: 18,

        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1.5rem",

        img: {
            borderRadius: "100%",
            width: 180,
            border: "2px solid $primary500"
        },

        div: {
            width: "620px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            p: {
                color: "$gray300"
            },
            span: {
                color: "$gray300"
            }
        },

        ".additional-information": {
            gap: 5,

            p: {
                color: "$white"
            }
        }
    }
});
