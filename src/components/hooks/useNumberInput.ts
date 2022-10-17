import { useCallback, useEffect, useState } from "react";

import { clamp } from "../helpers";
import { NumberInputProps } from "../NumberInput";

export default function useNumberInput(props: NumberInputProps) {
    const { value } = props;
    const [displayValue, setDisplayValue] = useState<string>(
        props.value?.toLocaleString("fullwide", { useGrouping: false })
    );
    const [min, max] = [props.min ?? Number.MIN_SAFE_INTEGER, props.max ?? Number.MAX_SAFE_INTEGER];

    const stepSize = props.stepSize ?? 1;

    useEffect(() => {
        setDisplayValue(
            value === undefined ? "0" : value.toLocaleString("fullwide", { useGrouping: false })
        );
    }, [value]);

    const changeValue = useCallback(
        (value: string) => {
            // Make sure the value matches a number
            if (value.length > 0 && !/^(-|-?\d+)$/m.test(value)) {
                return;
            }

            // Set the display value
            let val = parseInt(value, 10);

            setDisplayValue(value);
            // If the value is not a valid number do not update
            // the actual outer value
            if (isNaN(val)) {
                return;
            }

            val = clamp(val, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            setDisplayValue(val.toLocaleString("fullwide", { useGrouping: false }));

            props.onChange(val);
        },
        [props]
    );

    // Handle value increments and decrements
    const increment = useCallback(
        (amount) => {
            const newVal = clamp(
                props.value + amount,
                Number.MIN_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER
            );
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
