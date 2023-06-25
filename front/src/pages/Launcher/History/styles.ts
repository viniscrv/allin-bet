import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
    display: "flex",
    flexDirection: "column"
});

export const HistoryList = styled("div", {
    paddingTop: 18,
    overflow: "auto",
    minWidth: 1000,
    maxHeight: "60vh",
    overflowY: "scroll",

    table: {
        width: "100%",
        borderCollapse: "collapse",

        th: {
            backgroundColor: "$gray800",
            color: "$white",
            padding: 16,
            lineHeight: 1.6,

            span: {
                display: "flex",
                alignItems: "center",
                gap: 10
            },

            "&:first-child": {
                borderTopLeftRadius: 8,
                paddingLeft: 22
            },
            "&:last-child": {
                borderTopRightRadius: 8,
                paddingRight: 22
            }
        },
        td: {
            backgroundColor: "$gray900",
            borderTop: "1px solid $gray200",
            padding: 16,
            lineHeight: 1.6,
            color: "$gray300",

            span: {
                display: "flex",
                alignItems: "center",
                color: "$gray300",
                gap: 10
            },

            "&:first-child": {
                width: "40%",
                paddingLeft: 22
            },
            "&:last-child": {
                paddingRight: 22
            }
        }
    }
});
