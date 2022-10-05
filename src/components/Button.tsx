import React, { useContext } from "react";

import ButtonGroupContext, { ButtonId } from "./contexts/ButtonGroupContext";
import { addOrSetValue, classNames, ComponentBase, PropsWithAnyChildren, valueIn } from "./helpers";
import styled from '@emotion/styled'
import { WithTheme } from "./Theme";
import { useTheme } from "./contexts/ThemeContext";

export interface ButtonProps extends ComponentBase {
    onClick?: () => void;
    id?: ButtonId;
}

const BaseButton = styled.div<WithTheme<ButtonProps>>(({theme}) => ({
    padding: 10,
    backgroundColor: theme.primaryColor,
    color: theme.textColorPrimary,
    borderRadius: theme.roundingFactor * 5,
    cursor: "pointer",
    ":hover": {
        backgroundColor: theme.primaryColorHover
    }
}))

export default function Button({
    className,
    id,
    onClick,
    ...props
}: PropsWithAnyChildren<ButtonProps>) {
    const { onSelect, selected } = useContext(ButtonGroupContext);
    const theme = useTheme();

    return (
        <BaseButton
            onClick={() => {
                if (onSelect && id) {
                    onSelect(addOrSetValue(id, selected));
                } else {
                    onClick?.call(undefined);
                }
            }}
            className={classNames(
                "oc-button",
                className
            )}
            {...props}
            theme={theme}
        >
            {props.children}
        </BaseButton>
    );
}
