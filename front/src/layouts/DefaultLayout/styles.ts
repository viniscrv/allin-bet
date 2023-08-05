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
        img: {
            width: 100
        }
    },
    "#menu-btn": {
        all: "unset",
        display: "none",
        backgroundColor: "transparent",
        cursor: "pointer"
    },
    div: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        img: {
            width: 60,
            border: "2px solid $primary500",
            borderRadius: "100%",
            cursor: "pointer"
        },
        span: {
            fontSize: "$lg",
            fontWeight: "bold"
        }
    },

    "@bp1": {
        "#logo": {
            display: "none"
        },
        "#menu-btn": {
            display: "block"
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
            width: "100%",
            padding: 3
        },
        ul: {
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid $gray200",
            paddingTop: 14,
            marginTop: 14,
            gap: 6,

            a: {
                "&.active": {
                    svg: {
                        fill: "$primary400"
                    },
                    li: {
                        color: "$primary400",
                        cursor: "default",

                        "&:hover": {
                            color: "$primary400",
                            svg: {
                                fill: "$primary400"
                            }
                        }
                    }
                },
                li: {
                    color: "$gray300",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,

                    "&:hover": {
                        color: "$white",
                        svg: {
                            fill: "$white"
                        }
                    }
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
    },

    "@bp1": {
        display: "none"
    },

    variants: {
        collapsable: {
            true: {
                transition: "all .5",
                height: "100vh",
                display: "block",
                position: "absolute",
                backgroundColor: "$gray900",
                border: "none",
                borderRight: "1px solid $gray200",
                borderRadius: 0,
                fontSize: "$md",
                zIndex: 10,
                nav: {
                    ul: {
                        gap: 10
                    }
                },
                ".logout": {
                    width: "min-content",
                    margin: "4rem auto",
                },
            }
        }
    }
});

export const Content = styled("div", {
    display: "flex",
    margin: 12,
    section: {
        margin: "0 auto"
    },

    "@bp1": {
        margin: "0 auto",
        section: {
            overflowX: "hidden"
        }
    }
});
