import React, { Fragment, useCallback } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import { classNames, InputProps } from "./helpers";

import "./styles/Input.scss";

export interface TextAreaProps extends InputProps<string> {
    maxLength?: number;
}

export default function TextArea(props: TextAreaProps) {
    const onChange = useCallback(
        (value) => {
            if (props.maxLength && value.length > props.maxLength) return;

            props.onChange(value);
        },
        [props]
    );

    let color = undefined;

    if (props.maxLength) {
        const percentageOfMax = props.value.length / props.maxLength;
        if (percentageOfMax >= 0.9) color = "#eb4d4b";
        else if (percentageOfMax >= 0.8) color = "#f9ca24";
        else color = undefined;
    }

    return (
        <div
            className={classNames(
                "oc-text-input",
                "oc-text-area",
                "oc-input",
                props.maxLength && " oc-limited",
                props.className
            )}
            style={{ ...props.style }}
        >
            <ReactTextareaAutosize
                name={props.name}
                maxLength={props.maxLength}
                onChange={(e) => onChange(e.target.value)}
                value={props.value}
            />
            {props.maxLength && props.value.length ? (
                <div style={{ backgroundColor: color }} className="oc-area-counter">
                    {props.maxLength - props.value.length}
                </div>
            ) : (
                <Fragment />
            )}
        </div>
    );
}
