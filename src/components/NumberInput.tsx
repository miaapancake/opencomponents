import React from "react";

import { ApplyInputFormContext, classNames, InputProps } from "./helpers";
import useNumberInput from "./hooks/useNumberInput";

export interface NumberInputProps extends InputProps<number> {
    min?: number;
    max?: number;
    stepSize?: number;
}

const NumberInput = (props: NumberInputProps) => {
    const {
        changeValue,
        displayValue,
        setDisplayValue,
        handleKeyDown,
        increment,
        onBlur,
        stepSize,
    } = useNumberInput(props);

    return (
        <div
            style={props.style}
            className={classNames(
                "oc-number-input oc-input",
                props.className,
                props.error && "oc-error"
            )}
        >
            <div className="oc-number-input-inner">
                <div className="oc-number-button oc-btn-minus" onClick={() => increment(-stepSize)}>
                    -
                </div>
                <input
                    name={props.name}
                    type={"string"}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => changeValue(e.currentTarget.value)}
                    onBlur={() => {
                        if (!displayValue) setDisplayValue("0");
                        if (onBlur) onBlur();
                    }}
                    value={displayValue}
                />
                <div className="oc-number-button oc-btn-plus" onClick={() => increment(stepSize)}>
                    +
                </div>
            </div>
            {props.error ? <div className="oc-error-message">{props.error}</div> : <></>}
        </div>
    );
};

export default ApplyInputFormContext(NumberInput, 0);
