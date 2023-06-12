import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
    main: {
        position: "relative",
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
        },

        button: {
            position: "absolute",
            right: 30,
            bottom: 30,
            padding: 10,
            backgroundColor: "$primary500",
            border: 0,
            borderRadius: 6,
            cursor: "pointer",
            transition: "all .2s",

            "&:hover": {
                backgroundColor: "$primary400",
                transform: "scale(1.1)"
            }
        }
    }
});

export const Statistics = styled("section", {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,

    div: {
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: 18,

        display: "flex",
        justifyContent: "space-between",

        p: {
            fontSize: "$sm"
        },
        span: {
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
        }
    }
});