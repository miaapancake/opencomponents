import styled from "@emotion/styled";
import React, { Fragment, useCallback } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import { classNames, InputProps } from "./helpers";
import { StyledTextInput } from "./TextInput";

export interface TextAreaProps extends InputProps<string> {
    maxLength?: number;
    minRows?: number;
    placeholder?: string;
    innerRef?: React.Ref<HTMLTextAreaElement>;
}

const StyledTextArea = styled(StyledTextInput)(() => {
    return {
        "& textarea": {
            outline: "none",
            border: "none",
            padding: 15,
            background: "none",
            resize: "none",
            width: "100%",
            fontFamily: "inherit",
            boxSizing: "border-box",
        },
    };
});

function TextArea(props: TextAreaProps) {
    const onChange = useCallback(
        (value) => {
            if (props.maxLength && value.length > props.maxLength) return;

            props.onChange(value);
        },
        [props]
    );

    return (
        <StyledTextArea rounded className={classNames(props.className)} style={{ ...props.style }}>
            <ReactTextareaAutosize
                ref={props.innerRef}
                minRows={props.minRows ?? 3}
                name={props.name}
                maxLength={props.maxLength}
                onChange={(e) => onChange(e.target.value)}
                value={props.value}
                onBlur={() => props.onBlur?.call(this)}
                placeholder={props.placeholder}
            />
            {props.error ? <div className="oc-error-message">{props.error}</div> : <></>}
        </StyledTextArea>
    );
}

export default TextArea;
