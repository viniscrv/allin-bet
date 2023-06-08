import { createStitches } from "@stitches/react";

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config
} = createStitches({
    theme: {
        colors: {
            gray900: "#121214", // bg
            gray800: "#202024", // box
            gray300: "#8B8B8B", // secondary text
            gray200: "#A9A7A7", // border
            primary500: "#BE123C",
            primary400: "#E52151",

            white: "#DED9D9" // primary text
        },
        fontSizes: {
            sm: "16px",
            md: "20px",
            lg: "24px"
        }
    }
});
