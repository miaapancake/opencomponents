import styled from "@emotion/styled";
import React, { useMemo } from "react";

import { ButtonProps } from "./Button";
import ButtonGroupContext, {
    ButtonGroupContextValue,
    ButtonId,
} from "./contexts/ButtonGroupContext";
import { useTheme } from "./contexts/ThemeContext";
import { classNames, ComponentBase, PropsWithChildren } from "./helpers";

export interface ButtonGroupProps<T extends ButtonId | ButtonId[]> extends ComponentBase {
    onSelect?: (id: T) => void;
    selected?: T;
}

const BaseButtonGroup = styled.div(() => {
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

export default function ButtonGroup<T extends ButtonId | ButtonId[]>({
    style,
    className,
    onSelect,
    selected,
    ...props
}: PropsWithChildren<ButtonGroupProps<T>, ButtonProps>) {
    const contextValue = useMemo<ButtonGroupContextValue>(
        () => ({
            onSelect,
            selected,
        }),
        [selected, onSelect]
    );

    return (
        <BaseButtonGroup style={style} className={classNames(className)}>
            <ButtonGroupContext.Provider value={contextValue}>
                {props.children}
            </ButtonGroupContext.Provider>
        </BaseButtonGroup>
    );
}
