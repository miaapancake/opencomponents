import { cn, InputProps } from "./helpers";
import React, { Fragment, useCallback } from 'react';

import './styles/Input.scss';
import ReactTextareaAutosize from "react-textarea-autosize";

export interface TextAreaProps extends InputProps<string> {
    maxLength?: number;
}

export default function TextArea(props: TextAreaProps) {

    const onChange = useCallback((value) => {

        if(props.maxLength && value.length > props.maxLength) return;

        props.onChange(value)
    }, [props]);

    let color = undefined;

    if(props.maxLength) {
        const percentageOfMax = (props.value.length)/props.maxLength;
        if(percentageOfMax >= .9) color = '#eb4d4b'; 
        else if(percentageOfMax >= .8) color = '#f9ca24';
        else color = undefined;
    }

    return (
        <div 
            className={'oc_text_input oc_text_area oc_input' + (props.maxLength ? ' oc_limited' : '') + cn(props.className)}
            style={{...props.style }}
        >
            <ReactTextareaAutosize 
                name={props.name}
                maxLength={props.maxLength}
                onChange={(e) => onChange(e.target.value)}
                value={props.value}
            />
            {
                props.maxLength && props.value.length ?
                    <div style={{color}} className="oc_area_counter">
                        {(props.maxLength-props.value.length)}
                    </div>
                :
                    <Fragment />
            }
        </div>
    );
}