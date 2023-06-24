import * as RadioGroup from "@radix-ui/react-radio-group";
import { styled } from "../../../../../stitches.config";

export const Container = styled("div", {
    ".game-container": {
        margin: "8px 0",
        width: "1000px",
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: 18,

        form: {
            width: "25%",
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
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem"
            },
            ".start-game-button": {
                width: "100%",
                backgroundColor: "$primary500",
                border: "none",
                borderRadius: 6,
                padding: "16px 64px",
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
    }
});

export const ColorSelect = styled(RadioGroup.Root, {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem"
});

export const ColorButton = styled(RadioGroup.Item, {
    margin: ".5rem 0",
    border: 0,
    borderRadius: 6,
    padding: "16px 0",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "$sm",
    transition: "all .2s",

    "&:disabled": {
        opacity: "0.5"
    },
    variants: {
        color: {
            yellow: {
                backgroundColor: "yellow",
                color: "black"
            },
            black: {
                backgroundColor: "#171717"
            }
        }
    }
});
