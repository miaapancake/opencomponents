import styled from "@emotion/styled";
import React from "react";

import { ApplyInputFormContext, classNames, InputProps } from "./helpers";
import useNumberInput from "./hooks/useNumberInput";
import Box from "./primitives/Box";
import { StyledInput as StyledInputBase, StyledTextInput } from "./TextInput";

export interface NumberInputProps extends InputProps<number> {
    min?: number;
    max?: number;
    stepSize?: number;
    placeholder?: string;
}

const StyledNumberInput = styled(StyledTextInput)({});

const StyledNumberInputButton = styled(Box)(() => ({
    width: 75,
    userSelect: "none",
    cursor: "pointer",
    ":hover": {
        backgroundColor: "rgba(0,0,0,.05)",
    },
}));

const StyledInput = styled(StyledInputBase)({
    textAlign: "center",
});

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
        <StyledNumberInput flex rounded style={props.style} className={classNames(props.className)}>
            <StyledNumberInputButton center onClick={() => increment(-stepSize)}>
                -
            </StyledNumberInputButton>
            <StyledInput
                name={props.name}
                type={"string"}
                onKeyDown={handleKeyDown}
                onChange={(e) => changeValue(e.currentTarget.value)}
                onBlur={() => {
                    if (!displayValue) setDisplayValue("0");
                    if (onBlur) onBlur();
                }}
                value={displayValue}
                placeholder={props.placeholder}
            />
            <StyledNumberInputButton center onClick={() => increment(stepSize)}>
                +
            </StyledNumberInputButton>
        </StyledNumberInput>
    );
};

export default ApplyInputFormContext(NumberInput, 0);
