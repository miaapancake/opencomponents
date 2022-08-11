import React, { useMemo } from "react";

import { ButtonProps } from "./Button";
import ButtonGroupContext, {
    ButtonGroupContextValue,
    ButtonId,
} from "./contexts/ButtonGroupContext";
import { classNames, ComponentBase, PropsWithChildren } from "./helpers";

export interface ButtonGroupProps extends ComponentBase {
    onSelect?: (id: ButtonId | ButtonId[]) => void;
    selected?: ButtonId | ButtonId[];
}

export default function ButtonGroup({
    style,
    className,
    onSelect,
    selected,
    ...props
}: PropsWithChildren<ButtonGroupProps, ButtonProps>) {
    const contextValue = useMemo<ButtonGroupContextValue>(
        () => ({
            onSelect,
            selected,
        }),
        [selected, onSelect]
    );

    return (
        <div style={style} className={classNames("oc-button-group", className)}>
            <ButtonGroupContext.Provider value={contextValue}>
                {props.children}
            </ButtonGroupContext.Provider>
        </div>
    );
}
