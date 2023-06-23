import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
    width: "100%",
    maxWidth: "1000px",

    h1: {
        marginBottom: "1rem"
    },

    section: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem"
    },

    input: {
        marginTop: ".5rem",
        backgroundColor: "transparent",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: "12px 24px",
        fontSize: "$sm",

        "&::placeholder": {
            fontSize: "$sm"
        }
    }
});

export const PurchaseInfo = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    ".payment-method": {
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: 18,

        display: "flex",
        justifyContent: "space-between",
    },

    div: {
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: 18,
        flex: 1,

        display: "flex",
        flexDirection: "column",
        gap: "1rem",

        h3: {
            fontSize: "$md"
        },

        input: {
            width: "120px",
            fontSize: "$md"
        },

        p: {
            color: "$gray300"
        },

        span: {
            display: "flex",
            alignItems: "center",
            color: "$gray300",
            gap: 8
        }
    }
});

export const CardInfo = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    h2: {
        lineHeight: 0.9
    },

    form: {
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: 18,

        label: {
            marginTop: ".5rem",
            display: "flex",
            flexDirection: "column"
        },

        ".small-input": {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem"
        },

        button: {
            marginTop: "1rem",
            backgroundColor: "$primary500",
            border: "none",
            borderRadius: 6,
            padding: "16px 84px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "$sm",
            transition: "all .2s",
            width: "100%",
            alignSelf: "center",

            "&:not([disabled]):hover": {
                backgroundColor: "$primary400"
            },

            "&:disabled": {
                opacity: "0.5"
            }
        }
    }
});
