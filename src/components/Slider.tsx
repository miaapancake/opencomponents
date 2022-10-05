import React, { useEffect, useRef, useState } from "react";

import SliderContext from "./contexts/SliderContext";
import { ApplyInputFormContext } from "./helpers";
import { RangeSliderHandle, SliderHandle } from "./SliderHandle";
import { RangeSliderTrack, SliderTrack } from "./SliderTrack";

export interface SliderProps<T extends number | [number, number]> {
    value: T;
    min?: number;
    max: number;
    onChange: (value: T) => void;
    trackMarks?: SliderTrackMark[];
    stepSize?: number | null;
}

export interface SliderTrackMark {
    label?: string | ((value: number) => string);
    value: number;
}

const Slider: React.FC<SliderProps<number | [number, number]>> = <
    T extends number | [number, number]
>({
    value,
    onChange,
    min,
    max: maxValue,
    trackMarks,
    stepSize,
}: SliderProps<T>) => {
    const [displayValue, setDisplayValue] = useState<number | [number, number]>(value);
    const rootRef = useRef<HTMLDivElement>();

    useEffect(() => {
        setDisplayValue(value);
    }, [value, setDisplayValue]);

    return (
        <div className="oc-slider" ref={rootRef}>
            <SliderContext.Provider
                value={{
                    displayValue: displayValue,
                    onChange: onChange,
                    setDisplayValue,
                    rootRef,
                    minValue: min ?? 0,
                    maxValue,
                    trackMarks,
                    stepSize: stepSize !== undefined ? stepSize : 1,
                }}
            >
                {!Array.isArray(value) ? (
                    <>
                        <SliderTrack />
                        <SliderHandle />
                    </>
                ) : (
                    <>
                        <RangeSliderTrack />
                        <RangeSliderHandle index={0} />
                        <RangeSliderHandle index={1} />
                    </>
                )}
            </SliderContext.Provider>
        </div>
    );
};

export default ApplyInputFormContext<SliderProps<number | [number, number]>>(Slider);
