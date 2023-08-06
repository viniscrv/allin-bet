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
            gray200: "#454546", // border
            // gray200: "#A9A7A7", // old border
            primary500: "#BE123C",
            primary400: "#E52151",
            green700: "#15803d", // success
            red700: "#D94848", // error

            white: "#DED9D9" // primary text
        },
        fontSizes: {
            sm: "16px",
            md: "18px",
            lg: "20px",
            lg2: "24px",
            lg3: "28px",
            lg4: "32px"
        }
    },
    media: {
        bp1: "(max-width: 1290px)",
    }
});
