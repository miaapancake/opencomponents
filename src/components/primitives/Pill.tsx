import styled from "@emotion/styled";

import { useTheme } from "../contexts/ThemeContext";

export interface PillProps {
    clickable?: boolean;
    active?: boolean;
}

const Pill = styled.div<PillProps>(({ active, clickable }) => {
    const theme = useTheme();

    return {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 10,
        userSelect: "none",
        borderRadius: "100px",
        padding: 10,
        backgroundColor: active ? theme.primaryColor : theme.inputBackgroundColor,
        color: active ? theme.textPrimaryColorContrast : theme.textPrimaryColor,
        fill: active ? theme.textPrimaryColorContrast : theme.textPrimaryColor,
        fontFamily: theme.defaultFont,
        cursor: clickable && "pointer",
        fontSize: ".9em",
        ":hover": {
            backgroundColor: active ? theme.primaryColorActive : theme.inputBackgroundColorActive,
        },
        transitionProperty: ["background-color", "color", "fill"],
        transitionDuration: "85ms",
        transitionTimingFunction: "ease-out",
    };
});

export default Pill;
