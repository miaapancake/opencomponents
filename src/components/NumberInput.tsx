import { clamp, cn, InputProps } from './helpers';
import React, { useCallback, useEffect, useState } from 'react';

export interface NumberInputProps extends InputProps<number> {
    min?: number;
    max?: number;
    stepSize?: number;
}

export default function NumberInput(props: NumberInputProps) {

    const [innervalue, setInnervalue] = useState<string>(props.value.toString());
    const stepSize = props.stepSize ?? 1;
    const [min,max] = [props.min ?? Number.MIN_SAFE_INTEGER, props.max ?? Number.MAX_SAFE_INTEGER];

    useEffect(() => {
        setInnervalue(props.value.toString())
    }, [props.value])

    const onChange = useCallback((value: string) => {
        
        if(value.length > 0 && !(/^(\-|\-?\d+)$/m).test(value)) {
            return;
        }

        setInnervalue(value);

        let val = parseInt(value, 10);

        if(isNaN(val)) {
            return;
        }
        
        props.onChange(val);
    }, [props]);

    const increment = useCallback((amount) => {
        const newVal = props.value+(amount);
        if(isNaN(newVal)) return;
        props.onChange(clamp(newVal, min, max));
    }, [props.value]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        switch(e.key) {
            case 'ArrowUp':
                increment(+stepSize);
                e.preventDefault();
            break;
            case 'ArrowDown':
                increment(-stepSize);   
                e.preventDefault();
            break
        } 
    }, [increment, stepSize]);

    return (
        <div style={props.style} className={'oc_number_input oc_input' + cn(props.className)}>
            <div className='oc_button oc_btn_minus' onClick={() => increment(-stepSize)}>-</div>
            <input
                name={props.name}
                type={'string'}
                onKeyDown={handleKeyDown}
                onChange={(e) => onChange(e.currentTarget.value)}
                value={innervalue}
            />
            <div className='oc_button oc_btn_plus' onClick={() => increment(stepSize)}>+</div>
        </div>
    );
}