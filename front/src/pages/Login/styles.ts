import { styled } from "../../../stitches.config";

export const Container = styled("div", {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: ".5rem",
    textAlign: "center",

    span: {
        color: "$gray300",
        fontSize: "$md",
        fontWeight: "bold"
    },

    form: {
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        width: 360,

        input: {
            backgroundColor: "transparent",
            border: "1px solid $gray200",
            borderRadius: 6,
            padding: "12px 24px",
            fontSize: "$sm",

            "&::placeholder": {
                fontSize: "$sm"
            }
        },

        ".credentials-error": {
            color: "$red700",
            fontSize: "$sm",
            alignSelf: "start",
            fontWeight: "normal"
        },

        button: {
            marginBottom: 8,
            backgroundColor: "$primary500",
            border: "none",
            borderRadius: 6,
            padding: "16px 84px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "$sm",
            transition: "all .2s",
            width: "min-content",
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
