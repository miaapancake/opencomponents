import styled from "@emotion/styled";

import { useTheme } from "../contexts/ThemeContext";

interface BoxProperties {
    padding?: boolean | number;
    rounded?: boolean;
    bordered?: boolean;
    shadow?: boolean;
    center?: boolean;
    flex?: boolean;
}

const Box = styled.div<BoxProperties>(({ padding, rounded, bordered, shadow, center, flex }) => {
    const theme = useTheme();

    return {
        display: center || flex ? "flex" : "block",
        justifyContent: center ? "center" : undefined,
        alignItems: center ? "center" : undefined,
        flexDirection: center ? "column" : undefined,
        borderWidth: shadow || bordered ? 1 : 0,
        borderStyle: "solid",
        borderColor: theme.boxBorderColor,
        padding: padding ? (padding === true ? 10 : padding) : 0,
        borderRadius: rounded ? 5 * theme.roundingFactor : 0,
        fontFamily: theme.defaultFont,
        color: theme.textPrimaryColor,
        boxShadow: shadow ? "4px 4px 5px rgba(0,0,0,.05)" : "none",
    };
});

export default Box;
