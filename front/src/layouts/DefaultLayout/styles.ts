import { keyframes, styled } from "../../../stitches.config";

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

const slideInSidebar = keyframes({
    from: {
        transform: "translateX(-100%)"
    },
    to: {
        transform: "translateX(0)"
    }
});

const slideOutSidebar = keyframes({
    from: {
        transform: "translateX(0)"
    },
    to: {
        transform: "translateX(-100%)"
    }
});

const CollapsableStyle = {
    height: "calc(100vh - 100px)",
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
        margin: "4rem auto"
    }
};

export const Aside = styled("aside", {
    backgroundColor: "$gray900",
    height: "calc(100vh - 100px)",
    width: 220,
    borderRight: "1px solid $gray200",
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
                ...CollapsableStyle,
                animation: `${slideInSidebar} .3s forwards`,
                
            },
            false: {
                "@bp1": {
                    ...CollapsableStyle,
                    animation: `${slideOutSidebar} .3s forwards`,
                }
            }
        }
    }
});

export const Content = styled("div", {
    display: "flex",
    section: {
        margin: "1rem auto"
    },

    "@bp1": {
        margin: "0 auto",
        section: {
            overflowX: "hidden"
        }
    }
});
