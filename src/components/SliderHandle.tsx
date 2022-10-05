import React, { useCallback, useContext, useEffect, useRef } from "react";

import SliderContext, { useSliderContext } from "./contexts/SliderContext";
import { clamp } from "./helpers";
import styled from '@emotion/styled';
import { WithTheme } from "./Theme";
import { useTheme } from "./contexts/ThemeContext";

interface SliderHandleProps {
    height?: number;
    width?: number;
}
interface BaseSliderHandleProps {
    width: number;
    height: number;
    value: number;
}

const BaseSliderHandle = styled.div<WithTheme<BaseSliderHandleProps>>(({theme, width, height, value}) => {
    return ({
        backgroundColor: theme.primaryColor,
        borderRadius: '50%',
        width: width ?? 25,
        height: height ?? 25,
        position: "absolute",
        top: 0,
        bottom: 0,
        marginTop: "auto",
        marginBottom: "auto"
    })
});

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

    useEffect(() => {
        document.addEventListener("mousemove", TrackMovement);
        document.addEventListener("mouseup", LetGo);

        return () => {
            document.removeEventListener("mousemove", TrackMovement);
            document.removeEventListener("mouseup", LetGo);
        };
    }, [LetGo, TrackMovement]);

    return (
        <BaseSliderHandle
            style={{left: `calc(${((displayValue - minValue) / (maxValue - minValue)) * 100}% - ${(props.width ?? 25)/2}px)`}}
            onMouseDown={() => holding.current = true}
            height={props.height}
            width={props.width}
            value={displayValue}
            theme={useTheme()}
            className="oc-slider-handle"
        ></BaseSliderHandle>
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

    useEffect(() => {
        document.addEventListener("mousemove", TrackMovement);
        document.addEventListener("mouseup", LetGo);

        return () => {
            document.removeEventListener("mousemove", TrackMovement);
            document.removeEventListener("mouseup", LetGo);
        };
    }, [LetGo, TrackMovement]);

    return (
        <BaseSliderHandle
            style={{left: `calc(${((displayValue[props.index] - minValue) / (maxValue - minValue)) * 100}% - ${(props.width ?? 25)/2}px)`}}
            onMouseDown={() => holding.current = true}
            height={props.height}
            width={props.width}
            value={displayValue[props.index]}
            theme={useTheme()}
            className="oc-slider-handle"
        ></BaseSliderHandle>
    );
}
