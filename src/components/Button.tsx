import styled from "@emotion/styled";
import React, { useContext } from "react";

import ButtonGroupContext from "./contexts/ButtonGroupContext";
import { useTheme } from "./contexts/ThemeContext";
import {
    addOrSetValue,
    classNames,
    ComponentBase,
    EventKey,
    PropsWithAnyChildren,
    valueIn,
} from "./helpers";

export interface ButtonProps extends ComponentBase {
    onClick?: () => void;
    eventKey?: EventKey;
    buttonStyle?: "primary" | "flat" | "secondary";
}

const BaseButton = styled.div<ButtonProps>(({ eventKey, buttonStyle }) => {
    const { selected } = useContext(ButtonGroupContext);
    const theme = useTheme();
    let bgColor, activeBGColor, hoverBGColor, textColor;

    switch (buttonStyle) {
        default:
        case "flat":
            bgColor = "none";
            activeBGColor = "rgba(0,0,0,.05)";
            hoverBGColor = "rgba(0,0,0,.1)";
            textColor = theme.textPrimaryColor;
            break;
        case "primary":
            bgColor = theme.primaryColor;
            activeBGColor = theme.primaryColorActive;
            hoverBGColor = theme.primaryColorHover;
            textColor = theme.textPrimaryColorContrast;
            break;
        case "secondary":
            bgColor = theme.secondaryColor;
            activeBGColor = theme.secondaryColorActive;
            hoverBGColor = theme.secondaryColorHover;
            textColor = theme.textPrimaryColorContrast;
            break;
    }

    return {
        display: "inline-block",
        fontFamily: theme.defaultFont,
        userSelect: "none",
        padding: 10,
        backgroundColor: valueIn(eventKey, selected) ? activeBGColor : bgColor,
        color: textColor,
        borderRadius: theme.roundingFactor * 5,
        cursor: "pointer",
        fontSize: "1.2em",
        ":hover": {
            backgroundColor: hoverBGColor,
        },
    };
});

export default function Button({
    className,
    eventKey,
    onClick,
    ...props
}: PropsWithAnyChildren<ButtonProps>) {
    const { onSelect, selected } = useContext(ButtonGroupContext);

    return (
        <BaseButton
            eventKey={eventKey}
            onClick={() => {
                if (onSelect && eventKey) {
                    onSelect(addOrSetValue(eventKey, selected));
                } else {
                    onClick?.call(undefined);
                }
            }}
            className={classNames("oc-button", className)}
            {...props}
        >
            {props.children}
        </BaseButton>
    );
}
