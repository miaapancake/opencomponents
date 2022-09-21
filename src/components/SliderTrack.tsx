import React, { Fragment, useContext } from "react";

import SliderContext, { useSliderContext } from "./contexts/SliderContext";
import { classNames } from "./helpers";

interface BaseSliderTrackProps {
    maxWidth: string;
    left: string;
    height?: number;
    color?: string;
    selectedRange?: [number, number];
}

function BaseSliderTrack(props: BaseSliderTrackProps) {
    const { maxValue, minValue, trackMarks, stepSize } = useContext(SliderContext);

    // If the trackmarks are already set just use those,
    // otherwise set them to an empty array that we can
    // use to match trackmarks to stepsize
    const marks = trackMarks ?? [];

    // If stepsize is set but no trackmarks are given
    // we want to match the trackmarks to the stepsize
    if (stepSize > 1 && !trackMarks) {
        // We start at index 0 because stepsize is always 0 aligned
        for (let i = 0; i < maxValue; i += stepSize) {
            // So for all stepvalues that are past the minSize we add a marker
            // up until we reach the maxValue
            if (i > minValue) {
                marks.push({ value: i });
            }
        }
    }
    const [start, end] = props.selectedRange;

    return (
        <>
            <div
                style={{
                    height: props.height ?? 6,
                }}
                className="oc-slider-track"
            ></div>
            <div
                style={{
                    left: props.left,
                    maxWidth: props.maxWidth,
                    height: props.height ?? 6,
                    backgroundColor: props.color ?? "var(--color-primary)",
                }}
                className="oc-slider-track-fill"
            ></div>
            {marks.map((mark) => {
                const pos = ((mark.value - minValue) / (maxValue - minValue)) * 100;
                return (
                    <Fragment key={"marker" + mark.value}>
                        {((minValue !== undefined && mark.value > minValue) ||
                            (minValue === undefined && mark.value > 0)) &&
                        mark.value < maxValue ? (
                            <div
                                className={classNames(
                                    "oc-slider-track-mark",
                                    mark.value > start && mark.value < end && "oc-active-mark"
                                )}
                                style={{ left: `calc(${pos}%)` }}
                            ></div>
                        ) : (
                            <></>
                        )}
                        {mark.label ? (
                            <div
                                className={classNames("oc-slider-track-mark-label")}
                                style={{ left: `calc(${pos}% - 25px)` }}
                            >
                                {typeof mark.label === "string"
                                    ? mark.label
                                    : mark.label?.call(undefined, mark.value)}
                            </div>
                        ) : (
                            <></>
                        )}
                    </Fragment>
                );
            })}
        </>
    );
}

type SliderTrackProps = Omit<BaseSliderTrackProps, "maxWidth" | "maxValue" | "left">;

export function SliderTrack(props: SliderTrackProps) {
    const { displayValue: value, maxValue, minValue } = useSliderContext<number>();

    return (
        <BaseSliderTrack
            {...props}
            left={"0px"}
            maxWidth={`${((value - minValue) / (maxValue - minValue)) * 100}%`}
            selectedRange={[minValue ?? 0, value]}
        />
    );
}

export function RangeSliderTrack(props: SliderTrackProps) {
    const { maxValue, minValue, displayValue: value } = useSliderContext<[number, number]>();

    const [start, end] = value;

    const startPos = ((start - minValue) / (maxValue - minValue)) * 100;
    const endPos = ((end - minValue) / (maxValue - minValue)) * 100;

    return (
        <BaseSliderTrack
            {...props}
            left={`${startPos}%`}
            maxWidth={`${endPos - startPos}%`}
            selectedRange={[start, end]}
        />
    );
}
