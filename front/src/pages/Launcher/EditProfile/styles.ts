import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
    main: {
        position: "relative",
        maxWidth: "800px",
        margin: "8px 0",
        backgroundColor: "$gray800",
        border: "1px solid $gray200",
        borderRadius: 6,
        padding: 18,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1.5rem",
        boxSizing: "border-box",
        width: "40vw",
        height: "73vh",

        img: {
            borderRadius: "100%",
            width: 100,
            border: "2px solid $primary500"
        },

        input: {
            marginTop: 1,
            backgroundColor: "transparent",
            border: "1px solid $gray200",
            borderRadius: 6,
            padding: "12px 24px",
            fontSize: "$sm",
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
                padding: "10px 84px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "$sm",
                transition: "all .2s",
                width: "min-content",
                alignSelf: "center",

                "&:not([disabled]):hover": {
                  backgroundColor: "$primary400",
                },

                "&:disabled": {
                  opacity: "0.5",
                },
            },
        },
        ".customFileUpload": {
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
            textAlign: "center",
    
            "&:hover": {
                backgroundColor: "$primary400",
            },
        },
    },
});
