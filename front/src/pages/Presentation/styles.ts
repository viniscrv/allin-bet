import { styled } from "../../../stitches.config";
import backgroundSvg from "../../assets/background.svg";

export const Container = styled("div", {
    backgroundImage: `url(${backgroundSvg})`,
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: ".5rem",
    textAlign: "center",

    h1: {
        fontSize: "$lg2"
    },
    p: {
        color: "$gray300",
        fontSize: "$md",
        fontWeight: "bold"
    },
    button: {
        marginTop: 16,
        backgroundColor: "$primary500",
        border: "none",
        borderRadius: 6,
        padding: "16px 84px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "$sm",
        transition: "all .2s",

        "&:hover": {
            backgroundColor: "$primary400"
        }
    },
    a: {
        fontSize: "$sm"
    },

    "@bp1": {
        padding: "0 16px"
    }
});
