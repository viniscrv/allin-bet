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

    p: {
        color: "$gray300",
        fontSize: "$md",
        fontWeight: "bold"
    },
    button: {
        marginTop: 14,
        backgroundColor: "$primary500",
        border: "none",
        borderRadius: 6,
        padding: "18px 84px",
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
    }
});
