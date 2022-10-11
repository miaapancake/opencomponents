import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

import SliderContext from "./contexts/SliderContext";
import { ApplyInputFormContext } from "./helpers";
import { RangeSliderHandle, SliderHandle } from "./SliderHandle";
import SliderTrack from "./SliderTrack";
export interface SliderProps<T extends number | [number, number]> {
    value: T;
    min?: number;
    max: number;
    onChange: (value: T) => void;
    trackMarks?: SliderTrackMark[];
    stepSize?: number | null;
}

const BaseSlider = styled.div({
    display: "inline-block",
    position: "relative",
    width: "100%",
    minHeight: 50,
    userSelect: "none",
});

export interface SliderTrackMark {
    label?: string | ((value: number) => string);
    value: number;
}

const Slider: React.FC<SliderProps<number | [number, number]>> = <
    T extends number | [number, number]
>({
    onChange,
    ...props
}: SliderProps<T>) => {
    const { value, min, max: maxValue, trackMarks, stepSize } = props;
    const [displayValue, setDisplayValue] = useState<number | [number, number]>(value);
    const rootRef = useRef<HTMLDivElement>();

    useEffect(() => {
        setDisplayValue(value);
    }, [value, setDisplayValue]);

    return (
        <BaseSlider ref={rootRef}>
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
                <SliderTrack />
                {!Array.isArray(value) ? (
                    <SliderHandle />
                ) : (
                    <>
                        <RangeSliderHandle index={0} />
                        <RangeSliderHandle index={1} />
                    </>
                )}
            </SliderContext.Provider>
        </BaseSlider>
    );
};

export default ApplyInputFormContext<SliderProps<number | [number, number]>>(Slider);
