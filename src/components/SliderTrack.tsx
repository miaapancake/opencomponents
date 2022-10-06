import styled from "@emotion/styled";
import React, { Fragment, useContext } from "react";

import SliderContext from "./contexts/SliderContext";
import { useTheme } from "./contexts/ThemeContext";

const BaseSliderTrack = styled.div<any>({
    position: "absolute",
    width: "100%",
    left: 0,
    top: 0,
    bottom: 0,
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "#ddd",
    height: 9,
    borderRadius: 3,
});

const BaseSliderTrackFill = styled(BaseSliderTrack)(() => ({
    backgroundColor: useTheme().primaryColor,
}));

const TrackMark = styled.div<{ value: number; start: number; end: number }>((props) => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    marginTop: "auto",
    marginBottom: "auto",
    transform: "translateX(-50%)",
    width: 2,
    height: 6,
    backgroundColor:
        props.value > props.start && props.value < props.end ? "#fff" : useTheme().primaryColor,
}));

const TrackMarkLabel = styled(TrackMark)((props) => {
    const theme = useTheme();

    return {
        borderRadius: 5 * theme.roundingFactor,
        backgroundColor:
            props.value >= props.start && props.value <= props.end ? theme.primaryColor : "#aaa",
        color: theme.textPrimaryColorContrast,
        minWidth: "min-content",
        padding: "0px 5px",
        top: 40,
        height: "min-content",
        lineHeight: "1.5em",
        whiteSpace: "nowrap",
        fontSize: ".9em",
        textAlign: "center",
        fontFamily: theme.defaultFont,
    };
});

export default function SliderTrack(props: any) {
    const {
        displayValue: value,
        maxValue,
        minValue,
        trackMarks,
        stepSize,
    } = useContext(SliderContext);

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

    let start: number, end: number, maxWidth: string, left: string;
    if (Array.isArray(value)) {
        [start, end] = value;
        const startPos = ((start - minValue) / (maxValue - minValue)) * 100;
        const endPos = ((end - minValue) / (maxValue - minValue)) * 100;
        maxWidth = `${endPos - startPos}%`;
        left = `${startPos}%`;
    } else {
        maxWidth = `${((value - minValue) / (maxValue - minValue)) * 100}%`;
        left = "0px";
        [start, end] = [minValue ?? 0, value];
    }

    return (
        <>
            <BaseSliderTrack {...props} />
            <BaseSliderTrackFill {...props} style={{ left, maxWidth }} />
            {marks.map((mark) => {
                const pos = ((mark.value - minValue) / (maxValue - minValue)) * 100;

                return (
                    <Fragment key={"marker" + mark.value}>
                        {((minValue !== undefined && mark.value > minValue) ||
                            (minValue === undefined && mark.value > 0)) &&
                        mark.value < maxValue ? (
                            <TrackMark
                                start={start}
                                end={end}
                                value={mark.value}
                                style={{ left: `${pos}%` }}
                            ></TrackMark>
                        ) : (
                            <></>
                        )}
                        {mark.label ? (
                            <TrackMarkLabel
                                value={mark.value}
                                start={start}
                                end={end}
                                style={{ left: `${pos}%` }}
                            >
                                {typeof mark.label === "string"
                                    ? mark.label
                                    : mark.label?.call(undefined, mark.value)}
                            </TrackMarkLabel>
                        ) : (
                            <></>
                        )}
                    </Fragment>
                );
            })}
        </>
    );
}
