import styled from "@emotion/styled";
import React from "react";

import DatePickerContext from "./contexts/DatePickerContext";
import { DatePickerBody } from "./DatePickerBody";
import { DatePickerHeader } from "./DatePickerHeader";
import { compareDate, InputProps, Maybe } from "./helpers";
import { useDatePicker, useRangeDatePicker } from "./hooks/useDatePicker";

const StyledDatePicker = styled.div({
    maxWidth: 280,
});

export type DatePickerProps = InputProps<Maybe<Date>>;

function DatePicker(props: DatePickerProps) {
    const { value, dates, setViewMonth, setViewYear, setYearView, viewMonth, viewYear, yearView } =
        useDatePicker(props);

    return (
        <StyledDatePicker>
            <DatePickerContext.Provider
                value={{
                    setViewMonth,
                    setViewYear,
                    setYearView,
                    value,
                    yearView,
                    viewMonth,
                    viewYear,
                }}
            >
                <DatePickerHeader />
                <DatePickerBody
                    dates={dates}
                    onChangeDate={(date) => {
                        props.onChange(compareDate(date, value) ? undefined : date);
                        setViewMonth(date.getMonth());
                        setViewYear(date.getFullYear());
                    }}
                />
            </DatePickerContext.Provider>
        </StyledDatePicker>
    );
}

export type RangeDatePickerProps = InputProps<[Maybe<Date>, Maybe<Date>]>;

function RangeDatePicker(props: RangeDatePickerProps) {
    const {
        value,
        dates,
        setViewMonth,
        setViewYear,
        setYearView,
        viewMonth,
        viewYear,
        yearView,
        modifyDateRange,
    } = useRangeDatePicker(props);

    return (
        <StyledDatePicker>
            <DatePickerContext.Provider
                value={{
                    setViewMonth,
                    setViewYear,
                    setYearView,
                    yearView,
                    viewMonth,
                    viewYear,
                    value,
                }}
            >
                <DatePickerHeader />
                <DatePickerBody dates={dates} onChangeDate={modifyDateRange} />
            </DatePickerContext.Provider>
        </StyledDatePicker>
    );
}

// TODO: Add input components for datepickers:
// https://git.openthingies.com/OpenThingies/components/issues/20

export default Object.assign(DatePicker, {
    displayName: "DatePicker",
    Range: Object.assign(RangeDatePicker, { displayName: "DatePicker.Range" }),
});
