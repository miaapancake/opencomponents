import React, { useCallback, useContext, useEffect, useRef } from "react";

import SliderContext, { useSliderContext } from "./contexts/SliderContext";
import { clamp } from "./helpers";

interface SliderHandleProps {
    height?: number;
    width?: number;
    color?: string;
}

export function SliderHandle(props: SliderHandleProps) {
    const {
        maxValue,
        minValue,
        rootRef,
        stepSize,
        trackMarks,
        displayValue,
        setDisplayValue,
        onChange,
    } = useSliderContext<number>();

    const holding = useRef<boolean>(false);

    const TrackMovement = useCallback(
        (e: MouseEvent) => {
            if (holding.current) {
                // get root element x position
                const { left: rootPosLeft } = rootRef.current.getBoundingClientRect();

                const relX = e.clientX - rootPosLeft;
                const width = rootRef.current.clientWidth;
                const fraction = relX / width;

                // Get the value for the current position offset for minValue
                let newValue = minValue + (maxValue - minValue) * fraction;

                if (stepSize === null && trackMarks) {
                    // If the stepsize is set to null and trackmarks are set
                    // treat like a restricted range
                    newValue = trackMarks
                        .map((x) => x.value)
                        .reduce(function (prev, curr) {
                            return Math.abs(curr - newValue) < Math.abs(prev - newValue)
                                ? curr
                                : prev;
                        });
                } else if (stepSize) {
                    // Else if there is a stepsize set adhere to stepsize
                    newValue = stepSize * Math.round(newValue / stepSize);
                }

                // set the display value to the clamped fraction
                setDisplayValue(clamp(newValue, minValue, maxValue));
            }
        },
        [setDisplayValue, holding, rootRef, minValue, maxValue, stepSize, trackMarks]
    );

    // Update the value when the slider button is released
    const LetGo = useCallback(() => {
        holding.current = false;
        onChange(displayValue);
    }, [onChange, displayValue, holding]);

    return (
        <BaseSliderHandle
            onMouseDown={() => (holding.current = true)}
            width={props.width}
            height={props.height}
            value={displayValue}
            color={props.color}
            TrackMovement={TrackMovement}
            LetGo={LetGo}
        />
    );
}

export function RangeSliderHandle(props: { index: number } & SliderHandleProps) {
    const { displayValue, setDisplayValue, onChange } = useSliderContext<[number, number]>();

    const { maxValue, minValue, rootRef, stepSize, trackMarks } = useContext(SliderContext);

    const holding = useRef<boolean>(false);

    const TrackMovement = useCallback(
        (e: MouseEvent) => {
            if (holding.current) {
                // get root element x position
                const { left: rootPosLeft } = rootRef.current.getBoundingClientRect();

                const relX = e.clientX - rootPosLeft;
                const width = rootRef.current.clientWidth;
                const fraction = relX / width;

                // Get the value for the current position offset for minValue
                let newValue = minValue + (maxValue - minValue) * fraction;

                // Copy the displayvalue
                const newDisplayValue: [number, number] = [...displayValue];

                if (stepSize === null && trackMarks) {
                    // If the stepsize is set to null and trackmarks are set
                    // treat like a restricted range

                    newValue = trackMarks
                        .map((x) => x.value)
                        .reduce(function (prev, curr) {
                            return Math.abs(curr - newValue) < Math.abs(prev - newValue)
                                ? curr
                                : prev;
                        });

                    // Prevent sliderhandles from moving past or on top of eachother
                    if (props.index === 0 && newValue >= displayValue[1]) return;
                    else if (newValue <= displayValue[0]) return;

                    // Update value
                    newDisplayValue[props.index] = newValue;
                } else if (stepSize) {
                    // Else if the stepsize is set adhere to it
                    newValue = stepSize * Math.round(newValue / stepSize);

                    // Prevent sliderhandles from moving past or on top of eachother
                    newDisplayValue[props.index] = clamp(
                        newValue,
                        props.index === 1 ? displayValue[0] + stepSize : minValue,
                        props.index === 0 ? displayValue[1] - stepSize : maxValue
                    );
                } else {
                    newValue = stepSize * Math.round(newValue);
                }

                // set the display value to the clamped fraction
                setDisplayValue(newDisplayValue);
            }
        },
        [
            props.index,
            setDisplayValue,
            displayValue,
            holding,
            rootRef,
            minValue,
            maxValue,
            stepSize,
            trackMarks,
        ]
    );

    // Update the value when the slider button is released
    const LetGo = useCallback(() => {
        holding.current = false;
        onChange(displayValue);
    }, [onChange, displayValue, holding]);

    return (
        <BaseSliderHandle
            onMouseDown={() => (holding.current = true)}
            width={props.width}
            height={props.height}
            value={displayValue[props.index]}
            color={props.color}
            TrackMovement={TrackMovement}
            LetGo={LetGo}
        />
    );
}

interface BaseSliderHandleProps {
    width: number;
    height: number;
    value: number;
    color?: string;
    onMouseDown: () => void;
    TrackMovement: (e: MouseEvent) => void;
    LetGo: () => void;
}

export function BaseSliderHandle({
    width: propWidth,
    height: propHeight,
    value,
    onMouseDown,
    color,
    TrackMovement,
    LetGo,
}: BaseSliderHandleProps) {
    const width = propWidth ?? 20;
    const height = propHeight ?? 20;

    const { minValue, maxValue } = useSliderContext();

    useEffect(() => {
        document.addEventListener("mousemove", TrackMovement);
        document.addEventListener("mouseup", LetGo);

        return () => {
            document.removeEventListener("mousemove", TrackMovement);
            document.removeEventListener("mouseup", LetGo);
        };
    }, [LetGo, TrackMovement]);

    return (
        <div
            onMouseDown={onMouseDown}
            style={{
                width,
                height,
                left: `calc(-${width / 2}px + ${
                    ((value - minValue) / (maxValue - minValue)) * 100
                }%)`,
                backgroundColor: color ?? "var(--color-primary)",
            }}
            className="oc-slider-handle"
        ></div>
    );
}
