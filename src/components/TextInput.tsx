import React, { useCallback } from "react";

import { classNames, InputProps } from "./helpers";

import "./styles/Input.scss";

export interface TextInputProps extends InputProps<string> {
    type?: "text" | "email" | "password";
    maxLength?: number;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const onChange = useCallback(
        (value) => {
            if (props.maxLength && value.length > props.maxLength) return;

            props.onChange(value);
        },
        [props]
    );

    return (
        <div style={props.style} className={classNames("oc-text-input oc-input", props.className)}>
            <input
                ref={ref}
                name={props.name}
                type={props.type ?? "text"}
                maxLength={props.maxLength}
                onChange={(e) => onChange(e.target.value)}
                value={props.value}
            />
        </div>
    );
});

TextInput.displayName = "TextInput";

export default TextInput;
