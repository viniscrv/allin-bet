import * as RadioGroup from "@radix-ui/react-radio-group";
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
            span: {
                display: "flex",
                alignItems: "center",
                color: "$gray300",
                gap: 8
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
            ".color-select-fields": {
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)"
            },
            ".start-game-button": {
                width: "max-content",
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