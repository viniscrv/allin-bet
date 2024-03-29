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

export const ColorSelect = styled(RadioGroup.Root, {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem"
});

export const ColorButton = styled(RadioGroup.Item, {
    margin: ".5rem 0",
    border: "3px solid transparent",
    borderRadius: 6,
    padding: "18px 0",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "$sm",
    transition: "all .2s",

    "&:disabled": {
        opacity: "0.5"
    },
    "&[data-state='checked']": {
        border: "3px solid $white"
    },
    variants: {
        color: {
            red: {
                backgroundColor: "#FB3640"
            },
            white: {
                backgroundColor: "$white",
                color: "#171717",
                "&[data-state='checked']": {
                    border: "3px solid $primary500"
                }
            },
            black: {
                backgroundColor: "#171717"
            }
        }
    }
});

export const Roullete = styled("div", {
    overflowX: "hidden",
    alignSelf: "center",
    padding: "0 2rem",

    ".roulette-wrapper": {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: "0 auto",
        overflow: "hidden"
    },

    ".roulette-wrapper .selector": {
        height: "100%",
        width: "3px",
        backgroundColor: "white",
        left: "50%",
        transform: "translate(-50%, 0%)",
        position: "absolute",
        zIndex: "2"
    },

    ".roulette-wrapper .wheel": {
        display: "flex"
    },

    ".roulette-wrapper .wheel .row": {
        display: "flex"
    },

    ".roulette-wrapper .wheel .row .card": {
        height: "75px",
        width: "75px",
        margin: "3px",
        borderRadius: "8px",
        borderBottom: "3px solid rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "1.5rem",

        "&.red": {
            background: "#FB3640"
        },

        "&.white": {
            background: "$white",
            color: "#171717"
        },

        "&.black": {
            background: "#2d3035"
        }
    },

    "@bp1": {
        padding: "2rem 0",
        ".roulette-wrapper": {
            width: "85vw",
            padding: "0 1rem"
        }
    }
});
