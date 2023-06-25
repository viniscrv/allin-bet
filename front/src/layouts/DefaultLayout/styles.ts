import { styled } from "../../../stitches.config";

export const Container = styled("div", {
    a: {
        textDecoration: "none"
    }
});

export const Header = styled("header", {
    backgroundColor: "$gray900",
    height: 100,
    width: "100vw",
    borderBottom: "1px solid $gray200",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",

    "#logo": {
        width: 100
    },

    div: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        img: {
            width: 60,
            border: "2px dashed $primary500",
            borderRadius: "100%",
            cursor: "pointer"
        },
        span: {
            fontSize: "$lg",
            fontWeight: "bold"
        }
    }
});

export const Aside = styled("aside", {
    backgroundColor: "$gray800",
    height: "calc(100vh - 124px)",
    width: 220,
    border: "1px solid $gray200",
    borderRadius: 6,
    padding: 6,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    nav: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 6,

        span: {
            fontSize: "$lg",
            borderBottom: "1px solid $gray300",
            width: "100%",
            padding: 3
        },
        ul: {
            display: "flex",
            flexDirection: "column",
            gap: 6,
            listStyle: "none",

            li: {
                color: "$gray300",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 3,

                "&:hover": {
                    color: "$white"
                }
            }
        }
    },
    ".logout": {
        color: "$red700",
        fontSize: "$md",
        cursor: "pointer",
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        gap: 3,
        marginBottom: 32
    }
});

export const Content = styled("div", {
    display: "flex",
    margin: 12,
    section: {
        // marginLeft: 20
        margin: "0 auto"
    }
});
