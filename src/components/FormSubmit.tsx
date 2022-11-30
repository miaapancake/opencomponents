import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

import { useTheme } from "./contexts/ThemeContext";
import { ComponentBase } from "./helpers";

type FormSubmitProps = ComponentBase;

const BaseButton = styled.button(() => {
    const theme = useTheme();

    return {
        display: "inline-block",
        fontFamily: theme.defaultFont,
        userSelect: "none",
        padding: 10,
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

export default function FormSubmit({
    children,
    className,
    style,
}: PropsWithChildren<FormSubmitProps>) {
    return (
        <BaseButton className={className} style={style}>
            {children}
        </BaseButton>
    );
}
