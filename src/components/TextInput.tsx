import { cn, InputProps } from "./helpers";
import React, { useCallback } from "react";

import "./styles/Input.scss";

export interface TextInputProps extends InputProps<string> {
    type?: "text" | "email" | "password";
    maxLength?: number;
}

export default function TextInput(props: TextInputProps) {

    const onChange = useCallback((value) => {

        if(props.maxLength && value.length > props.maxLength) return;

        props.onChange(value);
    }, [props]);

    return (
        <div style={props.style} className={"oc-text-input oc-input" + cn(props.className)}>
            <input 
                name={props.name}
                type={props.type ?? "text"}
                maxLength={props.maxLength}
                onChange={(e) => onChange(e.target.value)}
                value={props.value}
            />
        </div>
    );
}