import { useCallback, useEffect, useState } from "react";

import { clamp } from "../helpers";
import { NumberInputProps } from "../NumberInput";

export default function useNumberInput(props: NumberInputProps) {
    const { value } = props;
    const [displayValue, setDisplayValue] = useState<string>(props.value.toString());
    const [min, max] = [props.min ?? Number.MIN_SAFE_INTEGER, props.max ?? Number.MAX_SAFE_INTEGER];

    const stepSize = props.stepSize ?? 1;

    useEffect(() => {
        setDisplayValue(!value ? "0" : value.toString());
    }, [value]);

    const changeValue = useCallback(
        (value: string) => {
            // Make sure the value matches a number
            if (value.length > 0 && !/^(-|-?\d+)$/m.test(value)) {
                return;
            }

            // Set the display value
            setDisplayValue(value);
            const val = parseInt(value, 10);

            // If the value is not a valid number do not update
            // the actual outer value
            if (isNaN(val)) {
                return;
            }

            props.onChange(val);
        },
        [props]
    );

    // Handle value increments and decrements
    const increment = useCallback(
        (amount) => {
            const newVal = props.value + amount;
            if (isNaN(newVal)) return;
            props.onChange(clamp(newVal, min, max));
            if (props.onBlur) props.onBlur(newVal);
        },
        [props, min, max]
    );

    // Increment and decrement value on ArrowDown and ArrowUp
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case "ArrowUp":
                    increment(+stepSize);
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    increment(-stepSize);
                    e.preventDefault();
                    break;
            }
        },
        [increment, stepSize]
    );

    return {
        handleKeyDown,
        increment,
        changeValue,
        stepSize,
        min,
        max,
        displayValue,
        setDisplayValue,
        ...props,
    };
}
