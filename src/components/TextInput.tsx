import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useCallback } from "react";

import { useTheme } from "./contexts/ThemeContext";
import { ApplyInputFormContext, InputProps } from "./helpers";
import Box from "./primitives/Box";

export interface TextInputProps extends InputProps<string> {
    type?: "text" | "email" | "password";
    maxLength?: number;
    innerRef?: React.RefCallback<HTMLInputElement>;
    placeholder?: string;
}

export const StyledTextInput = styled(Box)(() => {
    const theme = useTheme();

    return {
        overflow: "hidden",
        transitionDuration: "100ms",
        transitionProperty: "background-color",
        transitionTimingFunction: "ease-out",
        backgroundColor: theme.inputBackgroundColor,
        fontFamily: theme.defaultFont,
        ":focus-within": {
            backgroundColor: theme.inputBackgroundColorActive,
        },
    };
});

export const StyledInput = styled.input({
    border: "none",
    background: "none",
    outline: "none",
    padding: 15,
    fontSize: "1.1em",
    boxSizing: "border-box",
    width: "100%",
});

const TextInput = (props: TextInputProps) => {
    const onChange = useCallback(
        (value) => {
            if (props.maxLength && value.length > props.maxLength) return;

            props.onChange(value);
        },
        [props]
    );

    return (
        <StyledTextInput
            style={props.style}
            className={
                css`
                    transition-duration: 500ms;
                    transition-property: background-color;
                `.name
            }
            rounded
        >
            <StyledInput
                ref={props.innerRef}
                name={props.name}
                type={props.type ?? "text"}
                maxLength={props.maxLength}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => props.onBlur?.call(undefined)}
                value={props.value}
                placeholder={props.placeholder}
            />
            {props.error ? <div className="oc-error-message">{props.error}</div> : <></>}
        </StyledTextInput>
    );
};

TextInput.displayName = "TextInput";

export default ApplyInputFormContext(TextInput, "");
