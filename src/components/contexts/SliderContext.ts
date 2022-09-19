import React, { createContext, useContext } from "react";

import { SliderTrackMark } from "../Slider";

export interface SliderContextValue<T extends number | [number, number]> {
    displayValue?: T;
    setDisplayValue?: (value: T) => void;
    onChange?: (value: T) => void;
    minValue?: number;
    maxValue?: number;
    trackMarks?: SliderTrackMark[];
    stepSize?: number;
    rootRef?: React.RefObject<HTMLDivElement>;
}

const context = createContext<SliderContextValue<any>>({});

context.displayName = "SliderContext";

export const useSliderContext = <T extends number | [number, number]>() =>
    useContext<SliderContextValue<T>>(context);

export default context;
