import styled, { CSSObject } from "@emotion/styled";
import React from "react";

import { useTheme } from "./contexts/ThemeContext";
import { dayLetters, getDateStyle, Maybe } from "./helpers";

export interface DateGridProps<T extends Date | [Maybe<Date>, Maybe<Date>]> {
    dates: Date[];
    value: T;
    month: number;
    onChange: (date: Date) => void;
}

export const StyledDateGrid = styled.div<{ rows: number }>((props) => ({
    display: "inline-grid",
    width: "100%",
    gridTemplateColumns: "repeat(7, 40px)",
    gridTemplateRows: `repeat(${props.rows}, 40px)`,
    justifyContent: "center",
}));

export const StyledDateGridCell = styled.div<{
    header?: boolean;
    value?: Date;
    currentMonth?: number;
    currentValue?: Date | [Maybe<Date>, Maybe<Date>];
}>((props) => {
    const theme = useTheme();
    const style = getDateStyle(props.value, props.currentValue);
    let stateStyle: CSSObject = {};

    switch (style) {
        case "none":
            break;
        case "rangePart":
            stateStyle = {
                backgroundColor: theme.primaryColorActive,
            };
            break;
        case "rangeStart":
            stateStyle = {
                backgroundColor: theme.primaryColor,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
            };
            break;
        case "rangeEnd":
            stateStyle = {
                backgroundColor: theme.primaryColor,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
            };
            break;
        case "single":
            stateStyle = {
                backgroundColor: theme.primaryColor,
                borderRadius: 5,
            };
            break;
    }

    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.defaultFont,
        color:
            style !== "none"
                ? theme.textPrimaryColorContrast
                : props.value?.getMonth() !== props.currentMonth
                ? theme.textSecondaryColor
                : theme.textPrimaryColor,
        cursor: "pointer",
        textAlign: "center",
        userSelect: "none",
        fontWeight: props.header ? "bold" : "normal",
        ...stateStyle,
    };
});

export default function DateGrid<T extends Date | [Maybe<Date>, Maybe<Date>]>({
    dates,
    value,
    month,
    onChange,
}: DateGridProps<T>) {
    return (
        <StyledDateGrid rows={Math.ceil(dates.length / 7) + 1}>
            {dayLetters.map((day, i) => (
                <StyledDateGridCell header={true} key={"oc-day-item-header-" + i + day}>
                    {day}
                </StyledDateGridCell>
            ))}
            {dates.map((date, i) => (
                <StyledDateGridCell
                    key={"oc-day-item-date-" + i + date?.getDay()}
                    currentMonth={month}
                    onClick={() => onChange(date)}
                    value={date}
                    currentValue={value}
                >
                    {date?.getDate()}
                </StyledDateGridCell>
            ))}
        </StyledDateGrid>
    );
}
