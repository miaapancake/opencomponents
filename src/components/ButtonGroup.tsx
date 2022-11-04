import styled from "@emotion/styled";
import React, { useMemo } from "react";

import { ButtonProps } from "./Button";
import ButtonGroupContext, { ButtonGroupContextValue } from "./contexts/ButtonGroupContext";
import { useTheme } from "./contexts/ThemeContext";
import {
    classNames,
    ComponentBase,
    OptionalInputProps as BaseInputProps,
    PropsWithChildren,
} from "./helpers";

type InputProps =
    | BaseInputProps<string>
    | BaseInputProps<number>
    | BaseInputProps<string[]>
    | BaseInputProps<number[]>;

export type ButtonGroupProps = ComponentBase;

const StyledButtonGroup = styled.div(() => {
    const theme = useTheme();
    return {
        margin: "10px auto",
        "& .oc-button": {
            borderRadius: 0,
        },
        "& .oc-button:first-child": {
            borderTopLeftRadius: theme.roundingFactor * 5,
            borderBottomLeftRadius: theme.roundingFactor * 5,
        },
        "& .oc-button:last-child": {
            borderTopRightRadius: theme.roundingFactor * 5,
            borderBottomRightRadius: theme.roundingFactor * 5,
        },
    };
});

export default function ButtonGroup({
    style,
    className,
    onChange,
    value,
    ...props
}: PropsWithChildren<ButtonGroupProps, ButtonProps> & InputProps) {
    const contextValue = useMemo<ButtonGroupContextValue>(
        () => ({
            onSelect: onChange,
            selected: value,
        }),
        [value, onChange]
    );

    return (
        <StyledButtonGroup style={style} className={classNames(className)}>
            <ButtonGroupContext.Provider value={contextValue}>
                {props.children}
            </ButtonGroupContext.Provider>
        </StyledButtonGroup>
    );
}
