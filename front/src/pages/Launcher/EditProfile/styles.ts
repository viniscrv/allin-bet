import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
    main: {
        position: "relative",
        maxWidth: "800px",
        margin: "8px 0",
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: "2rem 3rem",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1.5rem",

        img: {
            borderRadius: "100%",
            width: 180,
            border: "2px solid $primary500"
        },
        label: {
            display: "flex",
            flexDirection: "column",
            gap: ".5rem"
        },
        input: {
            backgroundColor: "transparent",
            border: "1px solid $gray200",
            borderRadius: 6,
            padding: "12px 24px",
            fontSize: "$sm"
        },
        ".invalid": {
            color: "$red700",
            fontSize: 14,
            marginTop: ".5rem"
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "500px",

            button: {
                backgroundColor: "$primary500",
                border: "none",
                borderRadius: 6,
                padding: "16px 44px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "$sm",
                transition: "all .2s",
                width: "max-content",
                alignSelf: "end",

                "&:not([disabled]):hover": {
                    backgroundColor: "$primary400"
                },

                "&:disabled": {
                    opacity: "0.5"
                }
            },

            ".small-input": {
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem"
            }
        }
    },

    "@bp1": {
        padding: "0 1rem",
        h1: {
            margin: "1rem 0"
        },
        main: {
            width: "90vw",
            padding: "1rem",
            form: {
                width: "100%",
                ".small-input": {
                    gridTemplateColumns: "repeat(1, 1fr)"
                }
            },
            button: {
                flex: 1,
                marginBottom: "1rem"
            }
        }
    }
});
