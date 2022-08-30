import React, { useContext } from "react";

import ButtonGroupContext, { ButtonId } from "./contexts/ButtonGroupContext";
import { addOrSetValue, classNames, ComponentBase, PropsWithAnyChildren, valueIn } from "./helpers";

export interface ButtonProps extends ComponentBase {
    onClick?: () => void;
    buttonStyle?: "primary" | "secondary" | "flat";
    id?: ButtonId;
}

export default function Button({
    buttonStyle,
    style,
    className,
    id,
    onClick,
    ...props
}: PropsWithAnyChildren<ButtonProps>) {
    const { onSelect, selected } = useContext(ButtonGroupContext);

    return (
        <div
            onClick={() => {
                if (onSelect && id) {
                    onSelect(addOrSetValue(id, selected));
                } else {
                    onClick?.call(undefined);
                }
            }}
            style={style}
            className={classNames(
                "oc-button",
                `oc-${buttonStyle}`,
                valueIn(id, selected) && "oc-selected",
                className
            )}
        >
            {props.children}
        </div>
    );
}
