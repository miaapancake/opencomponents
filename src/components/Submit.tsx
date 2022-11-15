import styled from "@emotion/styled";
import React from "react";

import { useTheme } from "./contexts/ThemeContext";
import { ComponentBase, PropsWithChildOfType } from "./helpers";

export interface ButtonProps extends ComponentBase {
    onClick?: () => void;
    buttonStyle?: "primary" | "flat" | "secondary";
}

const BaseSubmit = styled.input<ButtonProps>(() => {
    const theme = useTheme();
    return {
        margin: "10px 0px",
        width: "100%",
        display: "block",
        border: "none",
        fontFamily: theme.defaultFont,
        userSelect: "none",
        padding: 15,
        backgroundColor: theme.primaryColor,
        color: theme.textPrimaryColorContrast,
        borderRadius: theme.roundingFactor * 5,
        cursor: "pointer",
        fontSize: "1.2em",
        ":hover": {
            backgroundColor: theme.primaryColorHover,
        },
    };
});

export default function Button({
    className,
    onClick,
    children,
    ...props
}: PropsWithChildOfType<ButtonProps, string>) {
    return (
        <BaseSubmit
            type="submit"
            onClick={() => onClick?.call(undefined)}
            className={className}
            value={children}
            {...props}
        />
    );
}
