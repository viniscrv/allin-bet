import { styled } from "../../../../../stitches.config";

export const Container = styled("div", {
    ".game-container": {
        margin: "1rem 0",
        width: "1000px",
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: 18,

        display: "flex",

        form: {
            paddingRight: ".5rem",
            borderRight: "1px solid $gray200",
            maxWidth: "255px",
            span: {
                display: "flex",
                alignItems: "center",
                color: "$gray300",
                gap: 8,
            },
            input: {
                width: "100%",
                margin: ".5rem 0",
                backgroundColor: "transparent",
                border: "1px solid $gray200",
                borderRadius: 6,
                padding: "12px 24px",
                fontSize: "$sm",

                "&::placeholder": {
                    fontSize: "$sm"
                }
            },
            select: {
                width: "100%",
                margin: ".5rem 0",
                backgroundColor: "transparent",
                border: "1px solid $gray200",
                borderRadius: 6,
                padding: "12px",
                fontSize: "$sm",

                "&::placeholder": {
                    fontSize: "$sm"
                }
            },
            ".game-informations": {
                ".game-informations-sm": {
                    display: "flex",
                    gap: 12,
                    div: {
                        width: "50%"
                    }
                }
            },
            ".start-game-button": {
                width: "100%",
                backgroundColor: "$primary500",
                border: "none",
                borderRadius: 6,
                padding: "16px 44px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "$sm",
                transition: "all .2s",

                "&:not([disabled]):hover": {
                    backgroundColor: "$primary400"
                },
                "&:disabled": {
                    opacity: "0.5"
                }
            }
        },

        ".grid-cards": {
            flex: 1,
            marginLeft: "18px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "1rem",
            userSelect: "none"
        }
    },

    "@bp1": {
        padding: "0 1rem",
        h1: {
            margin: "1rem 0"
        },
        ".game-container": {
            width: "100%",
            maxWidth: "90vw",
            flexDirection: "column",
            form: {
                border: 0,
                ".start-game-button": {
                    width: "100%",
                    margin: "1rem 0",
                    flex: 1
                }
            }
        }
    }
});


export const Card = styled("div", {
    height: "120px",
    backgroundColor: "#2d3035",
    borderRadius: "4px",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
        backgroundColor: "#36393d"
    }
});