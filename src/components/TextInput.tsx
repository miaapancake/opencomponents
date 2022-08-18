import React, { useCallback } from "react";

import { ApplyInputFormContext, classNames, InputProps } from "./helpers";

import "./styles/Input.scss";

export interface TextInputProps extends InputProps<string> {
    type?: "text" | "email" | "password";
    maxLength?: number;
    innerRef?: React.RefObject<HTMLInputElement>;
}

const TextInput = (props: TextInputProps) => {
    const onChange = useCallback(
        (value) => {
            if (props.maxLength && value.length > props.maxLength) return;

            props.onChange(value);
        },
        [props]
    );

    return (
        <>
            <div
                style={props.style}
                className={classNames(
                    "oc-text-input oc-input",
                    props.className,
                    props.error && "oc-error"
                )}
            >
                <input
                    ref={props.innerRef}
                    name={props.name}
                    type={props.type ?? "text"}
                    maxLength={props.maxLength}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={() => props.onBlur?.call(this)}
                    value={props.value}
                />
                {props.error ? <div className="oc-error-message">{props.error}</div> : <></>}
            </div>
        </>
    );
};

TextInput.displayName = "TextInput";

export default ApplyInputFormContext(TextInput, "");
