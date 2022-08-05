import { clamp, cn, InputProps } from "./helpers";
import React, { useCallback, useEffect, useState } from "react";

export interface NumberInputProps extends InputProps<number> {
    min?: number;
    max?: number;
    stepSize?: number;
}

export default function NumberInput({onChange, value, ...props}: NumberInputProps) {

    const [innervalue, setInnervalue] = useState<string>(value.toString());
    const stepSize = props.stepSize ?? 1;
    const [min,max] = [props.min ?? Number.MIN_SAFE_INTEGER, props.max ?? Number.MAX_SAFE_INTEGER];

    useEffect(() => {
        setInnervalue(value.toString());
    }, [value]);

    const changeValue = useCallback((value: string) => {
        
        if(value.length > 0 && !(/^(-|-?\d+)$/m).test(value)) {
            return;
        }

        setInnervalue(value);

        const val = parseInt(value, 10);

        if(isNaN(val)) {
            return;
        }
        
        onChange(val);
    }, [onChange]);

    const increment = useCallback((amount) => {
        const newVal = value+(amount);
        if(isNaN(newVal)) return;
        onChange(clamp(newVal, min, max));
    }, [value, min, max, onChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        switch(e.key) {
        case "ArrowUp":
            increment(+stepSize);
            e.preventDefault();
            break;
        case "ArrowDown":
            increment(-stepSize);   
            e.preventDefault();
            break;
        } 
    }, [increment, stepSize]);

    return (
        <div style={props.style} className={"oc-number-input oc-input" + cn(props.className)}>
            <div className='oc-number-button oc-btn-minus' onClick={() => increment(-stepSize)}>-</div>
            <input
                name={props.name}
                type={"string"}
                onKeyDown={handleKeyDown}
                onChange={(e) => changeValue(e.currentTarget.value)}
                value={innervalue}
            />
            <div className='oc-number-button oc-btn-plus' onClick={() => increment(stepSize)}>+</div>
        </div>
    );
}